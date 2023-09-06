import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSession } from "../../../../core/authentication/useSession";
import { useDisplayToast } from "../../../../core/toasts/hooks/useDisplayToast";
import { Box } from "../../../../shared-components/box/Box";
import { Button } from "../../../../shared-components/buttons/Button";
import { Title } from "../../../../shared-components/title/Title";
import { NadeApi } from "../../../data/NadeApi";
import { NadeCreateBody } from "../../../models/NadeCreateBody";
import { PreviewNade } from "../../PreviewNades";
import { useCreateNade } from "../state/NadeAddStateProvider";
import { useGameMode } from "../../../../core/useGameMode";
import { GameMode } from "../../../models/GameMode";
import { useSignedInUser } from "../../../../core/authentication/useSignedInUser";

export const ConfirmNewNade: FC = () => {
  const { signedInUser } = useSignedInUser();
  const { nade } = useCreateNade();
  const { isLoading, onSubmitClick } = useSumbitNade(nade);

  return (
    <>
      <Box>
        <Title titleStyle="primary" title="Review Your Nade" bottomSpacing />
        {(signedInUser?.numNades || 0) <= 0 && (
          <div className="first-nade-warning">
            <h3>IMPORTANT!</h3>
            <p>It seems like you&apos;re submitting your first nade!</p>
            <p>
              Please wait for this nade to be approved before submitting more
              nades. We may provide feedback if you&apos;ve made any errors.
            </p>
            <p>
              This is to prevent you from wasting time on re-recording videos to
              correct mistakes.
            </p>
          </div>
        )}

        <div className="split">
          <div className="left">
            <p>Thank you for creating your nade!</p>
            <p>
              After submission, our dedicated moderators will review your nade
              for approval. The review process typically takes less than 24
              hours. If everything meets the criteria, your nade will be
              approved.
            </p>
            <p>
              We appreciate your patience and look forward to showcasing your
              impressive nade soon!
            </p>
          </div>
          <div className="right">
            <PreviewNade nade={{ ...nade }} />
          </div>
        </div>

        <div className="submit-btn-container">
          <Button
            icon={<FaCheck />}
            onClick={onSubmitClick}
            primary
            title="Submit nade"
            isLoading={isLoading}
          />
        </div>
      </Box>
      <style jsx>{`
        .split {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
        }

        .right {
          min-width: 350px;
        }

        .first-nade-warning {
          border: 5px solid #fc5e03;
          border-radius: 5px;
          padding: 15px;
          margin-bottom: 15px;
        }

        .first-nade-warning h3 {
          font-size: 20px;
          margin-bottom: 15px;
          font-weight: bold;
        }

        .submit-btn-container {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </>
  );
};

const useSumbitNade = (nadeBody: Partial<NadeCreateBody>) => {
  const { gameMode } = useGameMode();
  const router = useRouter();
  const { isAuthenticated } = useSession();
  const showToast = useDisplayToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmitClick = useCallback(async () => {
    setIsLoading(true);
    const nadeCreateBody = validateState(nadeBody, gameMode);

    if (!nadeCreateBody) {
      setIsLoading(false);
      setError("Failed to verify nade");
      console.error(nadeCreateBody);
      return showToast({
        severity: "error",
        message: `Failed to verify`,
        durationSeconds: 20,
      });
    }
    if (!isAuthenticated) {
      setIsLoading(false);
      return showToast({
        severity: "error",
        message: `You are not signed in.`,
        durationSeconds: 20,
      });
    }

    const result = await NadeApi.save(nadeCreateBody);
    if (result.isErr()) {
      return showToast({
        severity: "error",
        message: `Failed to add nade, check if you forgot to add something. Error: ${result.error.message}`,
        durationSeconds: 20,
      });
    }

    const newNade = result.value;

    showToast({
      severity: "success",
      message: "Nade added!",
      durationSeconds: 10,
    });

    router.push(`/nades/[nade]`, `/nades/${newNade.id}`);
  }, [nadeBody, isAuthenticated, router, showToast, gameMode]);

  return { isLoading, error, onSubmitClick };
};

const validateState = (
  nade: Partial<NadeCreateBody>,
  gameMode: GameMode
): NadeCreateBody | false => {
  const {
    description,
    imageBase64,
    lineUpImageBase64,
    map,
    mapEndLocationId,
    mapStartLocationId,
    movement,
    oneWay,
    proUrl,
    setPos,
    teamSide,
    technique,
    tickrate,
    type,
    youTubeId,
  } = nade;
  if (
    !description ||
    !imageBase64 ||
    !lineUpImageBase64 ||
    !map ||
    !mapEndLocationId ||
    !mapStartLocationId ||
    !movement ||
    !technique ||
    !type ||
    !youTubeId ||
    !teamSide
  ) {
    return false;
  }

  return {
    map,
    description,
    imageBase64,
    mapStartLocationId,
    mapEndLocationId,
    movement,
    technique,
    type,
    tickrate,
    lineUpImageBase64,
    oneWay,
    teamSide,
    setPos: setPosStringFix(setPos),
    proUrl,
    gameMode,
    youTubeId,
  };
};

function setPosStringFix(setPos?: string) {
  if (setPos && setPos.length > 0) {
    return setPos;
  }
  return undefined;
}
