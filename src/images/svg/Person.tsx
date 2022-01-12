import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={306}
    height={438}
    viewBox="0 0 306 438"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M61.72 91.88C61.72 142.278 102.599 183.161 153.001 183.161C203.399 183.161 244.282 142.282 244.282 91.88C244.282 41.482 203.399 0.0400391 153.001 0.0400391C102.603 0.0400391 61.72 40.923 61.72 91.88Z"
      fill="black"
    />
    <path
      d="M153 201.08C68.9999 201.08 0.679932 269.4 0.679932 353.4V402.119C35.9609 424.517 92.5199 437.959 153 437.959C213.48 437.959 270.04 424.518 305.32 402.119V353.4C305.32 269.4 237 201.08 153 201.08V201.08Z"
      fill="black"
    />
  </svg>
);

export default SvgComponent;
