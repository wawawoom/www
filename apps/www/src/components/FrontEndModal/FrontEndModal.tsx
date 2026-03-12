import { useTranslation } from "react-i18next";

import {
  WuiBadge,
  WuiBadgeColor,
  WuiBadgeSize,
  WuiText,
  WuiTextAs,
  WuiTextSize,
  WuiTitle,
  WuiTitleAs,
} from "@wawawoom/wui";

import { useTheme } from "../../context/ThemeContext";

export const FrontEndModal = () => {
  const { t } = useTranslation();

  const { theme, getBlackColor } = useTheme();

  const getBadgeColor = (): WuiBadgeColor => {
    return theme === "dark" ? WuiBadgeColor.PRIMARY : WuiBadgeColor.SECONDARY;
  };

  const getBadgeSize = (): WuiBadgeSize => {
    return WuiBadgeSize.M;
  };

  return (
    <>
      <WuiTitle
        as={WuiTitleAs.H1}
        style={{ marginTop: 0 }}
        color={getBlackColor()}
      >
        {t("frontEndModal.title")}
      </WuiTitle>

      <WuiText as={WuiTextAs.P} size={WuiTextSize.XL} color={getBlackColor()}>
        {t("frontEndModal.intro")}
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        Phase 1: Token Integration (The Bridge)
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        The implementation starts by consuming the data exported from Figma to
        ensure 1:1 visual fidelity.
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Token Transformation
            </WuiBadge>{" "}
            Using Style Dictionary or custom hooks to transform raw JSON tokens
            into CSS Variables, Tailwind configurations, or Theme Objects.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Typescript Safety
            </WuiBadge>{" "}
            Generating strict TypeScript interfaces for tokens to provide
            developers with full autocompletion and prevent the use of "magic
            numbers" in the codebase.
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        Phase 2: Atomic Engineering & Documentation
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        I build the library from the ground up, starting with the smallest
        functional units.
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Atomic Components
            </WuiBadge>{" "}
            Developing highly reusable, stateless primitives (Buttons, Inputs,
            Typography) with a focus on clean API design.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Living Documentation (Storybook)
            </WuiBadge>{" "}
            Creating a dedicated environment for each component, including
            Interactive Controls and clear Do’s & Don'ts for developers.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Atomic Testing
            </WuiBadge>{" "}
            Implementing unit tests for every primitive to ensure core behaviors
            (Click, Focus, Disabled states) are bulletproof.
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        Phase 3: Layout & Responsiveness
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        Interfaces must adapt perfectly to any environment. I build layout
        systems that handle complexity without breaking.
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Adaptive Grids
            </WuiBadge>{" "}
            Implementing flexible container systems that respond to Mobile,
            Tablet, and Desktop breakpoints.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Constraint-Based Spacing
            </WuiBadge>{" "}
            Using the design system’s spacing scale to manage margins and
            paddings, ensuring visual rhythm is maintained across all viewports.
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        Phase 4: Organic Components & Real-World Testing
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        I assemble primitives into complex "Organisms" (Header, Modals, Forms)
        that handle business logic and data.
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Integration Testing
            </WuiBadge>{" "}
            Running components in real-world scenarios to identify integration
            friction.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Iterative Refinement
            </WuiBadge>{" "}
            Adjusting component APIs and styles based on feedback from the field
            to ensure they are both flexible and resilient.
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        Phase 5: Accessibility & Quality Assurance
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        A professional implementation is inclusive by default.
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              A11y Compliance
            </WuiBadge>{" "}
            Ensuring keyboard navigation, ARIA labels, and focus management are
            baked into every component.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Visual Regression
            </WuiBadge>{" "}
            Running automated visual tests to detect any unintended UI changes
            during updates.
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        Phase 6: Packaging & CI/CD Deployment
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        The final stage is turning the codebase into a distributable product.
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              NPM Versioning
            </WuiBadge>{" "}
            Managing semantic versioning (SemVer) to ensure feature teams can
            update safely.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Automated Pipeline
            </WuiBadge>{" "}
            Setting up a CI/CD pipeline that runs tests, builds the Storybook,
            and deploys the private package automatically upon every merge.
          </li>
        </ul>
      </WuiText>

      <WuiTitle
        as={WuiTitleAs.H2}
        color={getBlackColor()}
        style={{ marginTop: 60 }}
      >
        Phase 7: Support, Maintenance & Evolution
      </WuiTitle>

      <WuiText as={WuiTextAs.P} color={getBlackColor()}>
        The system is a living product. I ensure it remains reliable and adapts
        to the real-world needs of the feature teams.
      </WuiText>

      <WuiText as={WuiTextAs.DIV} color={getBlackColor()}>
        <ul>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Direct Support
            </WuiBadge>{" "}
            Providing quick troubleshooting and guidance for complex
            integrations via dedicated channels.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Issue Tracking
            </WuiBadge>{" "}
            Managing bug reports and UI regressions with a clear path from
            discovery to hotfix.
          </li>
          <li>
            <WuiBadge size={getBadgeSize()} color={getBadgeColor()}>
              Continuous Improvement
            </WuiBadge>{" "}
            Evaluating and implementing new component requests to ensure the
            system grows with the product.
          </li>
        </ul>
      </WuiText>
    </>
  );
};
