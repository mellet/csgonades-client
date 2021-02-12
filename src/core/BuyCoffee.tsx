import { FC, memo } from "react";

export const BuyCoffee: FC = memo(() => {
  return (
    <>
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="csgonades"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#1c8fc0"
        data-position="Right"
        data-x_margin="16"
        data-y_margin="10"
      ></script>
    </>
  );
});
