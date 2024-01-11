import {
  DesignTokens,
  ColorModes,
  onDarkBase,
  onLightBase,
} from "@biom3/design-tokens";
import { BiomeCombinedProviders } from "@biom3/react";

export const getTheme = (colorMode: ColorModes): DesignTokens => {
  const base = colorMode === "darkOnLight" ? onDarkBase : onLightBase;
  return { base };
};

export function ThemeProvider({
  children,
  colorMode,
}: {
  children: React.ReactNode;
  colorMode: ColorModes;
}) {
  const theme = getTheme(colorMode);

  return (
    <BiomeCombinedProviders theme={theme}>{children}</BiomeCombinedProviders>
  );
}
