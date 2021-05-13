import { FC } from "react";

export const ImageResultImageMessage: FC = ({}) => {
  return (
    <>
      <div className="lineup-msg">
        <h3>Guideline</h3>
        <ul>
          <li>Image must be 16:9 aspect ratio</li>
          <li>Remove your hud (cl_drawhud 0; r_drawviewmodel 0;)</li>
          <li>Take screenshot</li>
        </ul>
      </div>
      <style jsx>{`
        .lineup-msg {
          background: rgba(255, 255, 255, 0.8);
          color: #111;
          border-radius: 5px;
          margin-bottom: 15px;
          padding: 10px;
        }

        p {
          font-size: 16px;
        }
      `}</style>
    </>
  );
};
