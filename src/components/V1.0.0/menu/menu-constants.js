const popperModifiers = [
  {
    name: "flip",
    enabled: false,
    options: {
      altBoundary: false,
      rootBoundary: "document",
      padding: 8
    }
  },
  {
    name: "preventOverflow",
    enabled: true,
    options: {
      altAxis: true,
      altBoundary: true,
      tether: true,
      rootBoundary: "document",
      padding: 8
    }
  }
];

export { popperModifiers };
