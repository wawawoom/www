import type { ReactElement } from "react";

export interface JobProps {
  logoUrl: string;
  companyName: string;
  jobTitle: string;
  description: string | ReactElement;
  badges?: string[];
  duration?: string;
}
