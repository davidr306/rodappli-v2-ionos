import { useEffect, useRef } from "react";
import SignaturePadLib from "signature_pad";

export default function SignaturePad({ onChange }) {
  const canvasRef = useRef(null);
  const padRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const resize = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = 200 * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
    };

    resize();

    const pad = new SignaturePadLib(canvas, {
      backgroundColor: "rgb(255,255,255)",
    });

    padRef.current = pad;

    pad.onEnd = () => {
      onChange(pad.toDataURL("image/png"));
    };

    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);
  }, [onChange]);

  const clear = () => {
    padRef.current.clear();
    onChange(null);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        style={{
          border: "2px dashed #3b82f6",
          borderRadius: 10,
          width: "100%",
          height: 200,
        }}
      />

      <button type="button" onClick={clear} style={{ marginTop: 10 }}>
        Effacer signature
      </button>
    </div>
  );
}