import { useRouter } from "next/router";
import { FC, useCallback, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { useSession } from "../../../../core/authentication/useSession";
import { useDisplayToast } from "../../../../core/toasts/hooks/useDisplayToast";
import { Box } from "../../../../shared-components/box/Box";
import { Button } from "../../../../shared-components/buttons/Button";
import { Title } from "../../../../shared-components/title/Title";
import { NadeApi } from "../../../data/NadeApi";
import { NadeCreateBody } from "../../../models/Nade";
import { PreviewNade } from "../../PreviewNades";
import { useCreateNade } from "../state/NadeAddStateProvider";

export const ConfirmNewNade: FC = () => {
  const { nade } = useCreateNade();
  const { isLoading, onSubmitClick } = useSumbitNade(nade);

  return (
    <>
      <Box>
        <Title titleStyle="primary" title="Review Your Nade" bottomSpacing />
        <p>Thank you for creating your nade!</p>
        <p>
          After submission, our dedicated moderators will review your nade for
          approval. The review process typically takes less than 24 hours. If
          everything meets the criteria, your nade will be approved.
        </p>
        <p>
          We appreciate your patience and look forward to showcasing your
          impressive nade soon!
        </p>
        <div className="preview-nade">
          <PreviewNade nade={nade} />
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
        .preview-nade {
          max-width: 350px;
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
  const router = useRouter();
  const { isAuthenticated } = useSession();
  const showToast = useDisplayToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmitClick = useCallback(async () => {
    setIsLoading(true);
    const nadeCreateBody = validateState(nadeBody);

    if (!nadeCreateBody) {
      setIsLoading(false);
      return setError("Failed to verify nade");
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
  }, [nadeBody, isAuthenticated, router, showToast]);

  return { isLoading, error, onSubmitClick };
};

export const validateState = (
  nade: Partial<NadeCreateBody>
): NadeCreateBody | false => {
  const {
    description,
    endPosition,
    gfycat,
    imageBase64,
    lineUpImageBase64,
    map,
    mapEndCoord,
    movement,
    oneWay,
    startPosition,
    technique,
    tickrate,
    type,
    teamSide,
    setPos,
    proUrl,
    youTubeId,
  } = nade;
  if (
    !description ||
    !endPosition ||
    !imageBase64 ||
    !lineUpImageBase64 ||
    !map ||
    !mapEndCoord ||
    !movement ||
    !startPosition ||
    !technique ||
    !type
  ) {
    return false;
  }

  return {
    map,
    description,
    endPosition,
    gfycat,
    imageBase64,
    mapEndCoord,
    movement,
    startPosition,
    technique,
    type,
    tickrate,
    lineUpImageBase64,
    oneWay,
    teamSide,
    setPos: setPosStringFix(setPos),
    proUrl,
    youTubeId,
  };
};

function setPosStringFix(setPos?: string) {
  if (setPos && setPos.length > 0) {
    return setPos;
  }
  return undefined;
}
