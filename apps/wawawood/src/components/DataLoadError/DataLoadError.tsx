import { WuiButton, WuiButtonColor, WuiButtonSize } from "@wawawoom/wui";

import "./DataLoadError.css";

interface DataLoadErrorProps {
  message?: string;
  onRetry?: () => void;
}

const DataLoadError = ({ message, onRetry }: DataLoadErrorProps) => {
  return (
    <div className="data-load-error">
      <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="Logo WaWaWooD" />

      <p className="data-load-error-emoji">🌲</p>

      <p className="data-load-error-title">
        Ooooooops. Il y a un problème.
        <br /> Merci de revenir plus tard.
      </p>

      {message ? <p className="data-load-error-message">{message}</p> : null}

      {onRetry ? (
        <WuiButton
          color={WuiButtonColor.SECONDARY}
          size={WuiButtonSize.M}
          onClick={onRetry}
          type="button"
        >
          Réessayer
        </WuiButton>
      ) : null}
    </div>
  );
};

export default DataLoadError;
