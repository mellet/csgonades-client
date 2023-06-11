import { FC } from "react";
import { useTheme } from "../../../settings/useTheme";

export const LogoSvg: FC = ({}) => {
  const { colors } = useTheme();
  return (
    <>
      <svg
        width="98"
        height="31"
        viewBox="0 0 98 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1028_142)">
          <ellipse
            cx="13.5"
            cy="17"
            rx="13.5"
            ry="14"
            fill={colors.smokeLogo}
          />
          <circle
            cx="26.1429"
            cy="20.1429"
            r="11.1429"
            fill={colors.smokeLogo}
          />
          <circle
            cx="40.2143"
            cy="21.2143"
            r="10.2143"
            fill={colors.smokeLogo}
          />
          <circle cx="40" cy="12" r="9" fill={colors.smokeLogo} />
          <circle cx="26" cy="9" r="9" fill={colors.smokeLogo} />
          <path
            d="M12.5117 19.2832H15.4316C15.373 20.2402 15.1094 21.0898 14.6406 21.832C14.1784 22.5742 13.5306 23.1536 12.6973 23.5703C11.8704 23.987 10.8743 24.1953 9.70898 24.1953C8.79753 24.1953 7.98047 24.0391 7.25781 23.7266C6.53516 23.4076 5.91667 22.9518 5.40234 22.3594C4.89453 21.7669 4.50716 21.0508 4.24023 20.2109C3.97331 19.3711 3.83984 18.4303 3.83984 17.3887V16.4023C3.83984 15.3607 3.97656 14.4199 4.25 13.5801C4.52995 12.7337 4.92708 12.0143 5.44141 11.4219C5.96224 10.8294 6.58398 10.3737 7.30664 10.0547C8.0293 9.73568 8.83659 9.57617 9.72852 9.57617C10.9134 9.57617 11.9128 9.79102 12.7266 10.2207C13.5469 10.6504 14.1816 11.2428 14.6309 11.998C15.0866 12.7533 15.36 13.6126 15.4512 14.5762H12.5215C12.4889 14.0033 12.375 13.5182 12.1797 13.1211C11.9844 12.7174 11.6882 12.4147 11.291 12.2129C10.9004 12.0046 10.3796 11.9004 9.72852 11.9004C9.24023 11.9004 8.8138 11.9915 8.44922 12.1738C8.08464 12.3561 7.77865 12.6328 7.53125 13.0039C7.28385 13.375 7.09831 13.8438 6.97461 14.4102C6.85742 14.9701 6.79883 15.6276 6.79883 16.3828V17.3887C6.79883 18.1243 6.85417 18.7721 6.96484 19.332C7.07552 19.8854 7.24479 20.3542 7.47266 20.7383C7.70703 21.1159 8.00651 21.4023 8.37109 21.5977C8.74219 21.7865 9.18815 21.8809 9.70898 21.8809C10.321 21.8809 10.8255 21.7832 11.2227 21.5879C11.6198 21.3926 11.9225 21.1029 12.1309 20.7188C12.3457 20.3346 12.4727 19.8561 12.5117 19.2832ZM24.7578 20.2793C24.7578 20.0254 24.7188 19.7975 24.6406 19.5957C24.569 19.3874 24.4323 19.1986 24.2305 19.0293C24.0286 18.8535 23.7454 18.681 23.3809 18.5117C23.0163 18.3424 22.5443 18.1667 21.9648 17.9844C21.3203 17.776 20.7083 17.5417 20.1289 17.2812C19.556 17.0208 19.0482 16.7181 18.6055 16.373C18.1693 16.0215 17.8242 15.6146 17.5703 15.1523C17.3229 14.6901 17.1992 14.153 17.1992 13.541C17.1992 12.9486 17.3294 12.4115 17.5898 11.9297C17.8503 11.4414 18.2148 11.0247 18.6836 10.6797C19.1523 10.3281 19.7057 10.0579 20.3438 9.86914C20.9883 9.68034 21.6947 9.58594 22.4629 9.58594C23.5111 9.58594 24.4258 9.77474 25.207 10.1523C25.9883 10.5299 26.5938 11.0475 27.0234 11.7051C27.4596 12.3626 27.6777 13.1146 27.6777 13.9609H24.7676C24.7676 13.5443 24.6797 13.1797 24.5039 12.8672C24.3346 12.5482 24.0742 12.2975 23.7227 12.1152C23.3776 11.9329 22.9414 11.8418 22.4141 11.8418C21.9062 11.8418 21.4831 11.9199 21.1445 12.0762C20.806 12.2259 20.5521 12.431 20.3828 12.6914C20.2135 12.9453 20.1289 13.2318 20.1289 13.5508C20.1289 13.7917 20.1875 14.0098 20.3047 14.2051C20.4284 14.4004 20.6107 14.5827 20.8516 14.752C21.0924 14.9212 21.3887 15.0807 21.7402 15.2305C22.0918 15.3802 22.4987 15.5267 22.9609 15.6699C23.7357 15.9043 24.416 16.168 25.002 16.4609C25.5944 16.7539 26.0892 17.0827 26.4863 17.4473C26.8835 17.8118 27.1829 18.2253 27.3848 18.6875C27.5866 19.1497 27.6875 19.6738 27.6875 20.2598C27.6875 20.8783 27.5671 21.4316 27.3262 21.9199C27.0853 22.4082 26.737 22.8216 26.2812 23.1602C25.8255 23.4987 25.2819 23.7559 24.6504 23.9316C24.0189 24.1074 23.3125 24.1953 22.5312 24.1953C21.8281 24.1953 21.1348 24.1042 20.4512 23.9219C19.7676 23.7331 19.1458 23.4499 18.5859 23.0723C18.0326 22.6947 17.5898 22.2129 17.2578 21.627C16.9258 21.041 16.7598 20.3477 16.7598 19.5469H19.6992C19.6992 19.9896 19.7676 20.3639 19.9043 20.6699C20.041 20.9759 20.2331 21.2233 20.4805 21.4121C20.7344 21.6009 21.0339 21.7376 21.3789 21.8223C21.7305 21.9069 22.1146 21.9492 22.5312 21.9492C23.0391 21.9492 23.4557 21.8776 23.7812 21.7344C24.1133 21.5911 24.3574 21.3926 24.5137 21.1387C24.6764 20.8848 24.7578 20.5983 24.7578 20.2793Z"
            fill={colors.PRIMARY}
          />
          <path
            d="M45.8418 9.78125V24H42.9121L37.1992 14.4688V24H34.2695V9.78125H37.1992L42.9219 19.3223V9.78125H45.8418ZM54.3477 12.2129L50.4805 24H47.3652L52.6484 9.78125H54.6309L54.3477 12.2129ZM57.5605 24L53.6836 12.2129L53.3711 9.78125H55.373L60.6855 24H57.5605ZM57.3848 18.707V21.002H49.875V18.707H57.3848ZM66.3691 24H63.2734L63.293 21.7148H66.3691C67.1374 21.7148 67.7852 21.5423 68.3125 21.1973C68.8398 20.8457 69.237 20.3346 69.5039 19.6641C69.7773 18.9935 69.9141 18.1829 69.9141 17.2324V16.5391C69.9141 15.8099 69.8359 15.1686 69.6797 14.6152C69.5299 14.0618 69.3053 13.5964 69.0059 13.2188C68.7064 12.8411 68.3385 12.5579 67.9023 12.3691C67.4661 12.1738 66.9648 12.0762 66.3984 12.0762H63.2148V9.78125H66.3984C67.349 9.78125 68.2181 9.94401 69.0059 10.2695C69.8001 10.5885 70.487 11.0475 71.0664 11.6465C71.6458 12.2454 72.0918 12.9616 72.4043 13.7949C72.7233 14.6217 72.8828 15.543 72.8828 16.5586V17.2324C72.8828 18.2415 72.7233 19.1628 72.4043 19.9961C72.0918 20.8294 71.6458 21.5456 71.0664 22.1445C70.4935 22.737 69.8066 23.196 69.0059 23.5215C68.2116 23.8405 67.3327 24 66.3691 24ZM64.9336 9.78125V24H62.0039V9.78125H64.9336ZM84.5527 21.7148V24H76.9844V21.7148H84.5527ZM77.9414 9.78125V24H75.0117V9.78125H77.9414ZM83.5664 15.5723V17.7988H76.9844V15.5723H83.5664ZM84.543 9.78125V12.0762H76.9844V9.78125H84.543ZM93.6641 20.2793C93.6641 20.0254 93.625 19.7975 93.5469 19.5957C93.4753 19.3874 93.3385 19.1986 93.1367 19.0293C92.9349 18.8535 92.6517 18.681 92.2871 18.5117C91.9225 18.3424 91.4505 18.1667 90.8711 17.9844C90.2266 17.776 89.6146 17.5417 89.0352 17.2812C88.4622 17.0208 87.9544 16.7181 87.5117 16.373C87.0755 16.0215 86.7305 15.6146 86.4766 15.1523C86.2292 14.6901 86.1055 14.153 86.1055 13.541C86.1055 12.9486 86.2357 12.4115 86.4961 11.9297C86.7565 11.4414 87.1211 11.0247 87.5898 10.6797C88.0586 10.3281 88.612 10.0579 89.25 9.86914C89.8945 9.68034 90.6009 9.58594 91.3691 9.58594C92.4173 9.58594 93.332 9.77474 94.1133 10.1523C94.8945 10.5299 95.5 11.0475 95.9297 11.7051C96.3659 12.3626 96.584 13.1146 96.584 13.9609H93.6738C93.6738 13.5443 93.5859 13.1797 93.4102 12.8672C93.2409 12.5482 92.9805 12.2975 92.6289 12.1152C92.2839 11.9329 91.8477 11.8418 91.3203 11.8418C90.8125 11.8418 90.3893 11.9199 90.0508 12.0762C89.7122 12.2259 89.4583 12.431 89.2891 12.6914C89.1198 12.9453 89.0352 13.2318 89.0352 13.5508C89.0352 13.7917 89.0938 14.0098 89.2109 14.2051C89.3346 14.4004 89.5169 14.5827 89.7578 14.752C89.9987 14.9212 90.2949 15.0807 90.6465 15.2305C90.998 15.3802 91.4049 15.5267 91.8672 15.6699C92.6419 15.9043 93.3223 16.168 93.9082 16.4609C94.5007 16.7539 94.9954 17.0827 95.3926 17.4473C95.7897 17.8118 96.0892 18.2253 96.291 18.6875C96.4928 19.1497 96.5938 19.6738 96.5938 20.2598C96.5938 20.8783 96.4733 21.4316 96.2324 21.9199C95.9915 22.4082 95.6432 22.8216 95.1875 23.1602C94.7318 23.4987 94.1882 23.7559 93.5566 23.9316C92.9251 24.1074 92.2188 24.1953 91.4375 24.1953C90.7344 24.1953 90.041 24.1042 89.3574 23.9219C88.6738 23.7331 88.0521 23.4499 87.4922 23.0723C86.9388 22.6947 86.4961 22.2129 86.1641 21.627C85.832 21.041 85.666 20.3477 85.666 19.5469H88.6055C88.6055 19.9896 88.6738 20.3639 88.8105 20.6699C88.9473 20.9759 89.1393 21.2233 89.3867 21.4121C89.6406 21.6009 89.9401 21.7376 90.2852 21.8223C90.6367 21.9069 91.0208 21.9492 91.4375 21.9492C91.9453 21.9492 92.362 21.8776 92.6875 21.7344C93.0195 21.5911 93.2637 21.3926 93.4199 21.1387C93.5827 20.8848 93.6641 20.5983 93.6641 20.2793Z"
            fill={colors.TEXT}
          />
          <rect
            x="26.2542"
            y="21.3536"
            width="1.86475"
            height="1.27356"
            rx="0.63678"
            transform="rotate(45 26.2542 21.3536)"
            fill="#B4B4B4"
            stroke="black"
            stroke-width="0.5"
          />
          <circle
            cx="28.3442"
            cy="24.3442"
            r="1.81915"
            transform="rotate(-45 28.3442 24.3442)"
            stroke="black"
            stroke-width="0.5"
          />
        </g>
        <defs>
          <clipPath id="clip0_1028_142">
            <rect width="98" height="31" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
