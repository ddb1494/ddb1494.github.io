type ObserveCallback = (entry: IntersectionObserverEntry) => void;

export const observe = (target: Element, callback: ObserveCallback, once: boolean = true,) => {
  const o = new IntersectionObserver((s) => {
    s.forEach((entry: IntersectionObserverEntry) => {
      const { isIntersecting, intersectionRatio, target } = entry;

      if (isIntersecting) {
        if (once) o.disconnect();

        if (target !== target.parentElement?.children.item(0)) {
          callback(entry);
        }
      }
    });
  });
  o.observe(target);
  return o;
};


