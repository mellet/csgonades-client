import { FC, useState } from "react";
import { useDisplayToast } from "../../../core/toasts/hooks/useDisplayToast";
import { ReportAddDto } from "../../../reports/models/Report";
import { ReportApi } from "../../../reports/data/ReportApi";
import { FaFlag } from "react-icons/fa";
import { Modal, Form, TextArea, Button } from "semantic-ui-react";
import { SquareButton } from "../../../shared-components/buttons/IconButton/IconButton";
import { Tooltip } from "../../../shared-components/Tooltip/Tooltip";
import { useGa } from "../../../utils/Analytics";
import { useTheme } from "../../../core/settings/SettingsHooks";

type Props = {
  nadeId: string;
};

export const NadeReportButton: FC<Props> = ({ nadeId }) => {
  const ga = useGa();
  const { colors } = useTheme();
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportMsg, setReportMsg] = useState("");
  const displayToast = useDisplayToast();

  function onToggle() {
    if (!showReportForm) {
      ga.event({
        category: "nade_page",
        action: "click_report_nade",
        label: nadeId,
      });
    }

    setShowReportForm(!showReportForm);
  }

  function onSendReport() {
    const report: ReportAddDto = {
      nadeId,
      message: reportMsg,
    };
    ReportApi.add(report);
    setReportMsg("");
    setShowReportForm(false);
    displayToast({
      severity: "success",
      title: "Report sent",
      message: "Thanks for reporting this nade. We will look into it.",
    });
  }

  return (
    <>
      <div className="report">
        <Tooltip message="Report" direction="right">
          <SquareButton
            icon={<FaFlag />}
            onClick={onToggle}
            active={false}
            activeColor={colors.ERROR}
          />
        </Tooltip>
      </div>

      <Modal open={showReportForm} onClose={onToggle}>
        <div className="report-nade">
          <p>
            <b>Not working for you?</b>
            <br />
            Make sure you read the description under the video if there is some
            detail you missed.
            <br />
            If the nade uses jumpthrow bind, it might not work on Matchmaking or
            3rd Party Service depending on the tickrate.
          </p>
          <Form onSubmit={onSendReport}>
            <Form.Field>
              <label>Report Reason</label>
              <TextArea
                placeholder="Tell me why your reporting the nade"
                value={reportMsg}
                rows={10}
                onChange={(e) => setReportMsg(e.currentTarget.value)}
              />
            </Form.Field>
            <Button positive type="submit" disabled={!reportMsg}>
              Send
            </Button>
          </Form>
        </div>
      </Modal>

      <style jsx>{`
        .report-button-wrapper {
          flex: 1;
          background: #ab1309;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 10px 16px;
          cursor: pointer;
          font-size: 15px;
          display: flex;
          align-items: center;
        }

        .report-button-wrapper span {
          margin-left: 6px;
        }

        .report-nade {
          min-width: 40vw;
          padding: 16px;
        }
      `}</style>
    </>
  );
};
