import { useEffect, useRef } from "react";

const useEffectOnce = (effect: React.EffectCallback) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    return effect();
  }, [effect]);
};

export default useEffectOnce;
