export const globalColor = {
  base_black: "#000",
  base_white: "#fff",
  gray_50: "#F9FAFB",
  gray_100: "#F2F4F7",
  gray_200: "#EAECF0",
  gray_300: "#D0D5DD",
  gray_400: "#98A2B3",
  gray_500: "#667085",
  gray_600: "#475467",
  gray_700: "#344054",
  gray_900: "#101828",
  primary_200: "#CAEBF9",
  primary_500: "#3FABD7",
  primary_600: "#1693C7",
  primary_700: "#007AAB",
  primary_800: "#0A5987",
  success_50: "#ECFDF3",
  success_200: "#ABEFC6",
  success_700: "#067647",
  error_600: "#D92D20",
  rose_50: "#FFEDEE",
  rose_200: "#F4CED1",
  orange_500: "#EF6820",
};
export const display_sm = {
  fontFamily: "Figtree",
  fontSize: "30px",
  lineHeight: "38px",
  fontWeight: "500",
  color: globalColor.gray_900,
  textDecoration: "none",
};
export const text_lx = {
  fontFamily: "Figtree",
  fontSize: "20px",
  lineHeight: "30px",
  fontWeight: "500",
  color: globalColor.gray_900,
  textDecoration: "none",
  margin: "0px",
};

export const text_lg = {
  fontFamily: "Figtree",
  fontSize: "18px",
  lineHeight: "28px",
  fontWeight: "500",
  color: globalColor.gray_900,
  textDecoration: "none",
};
export const text_rg = {
  fontFamily: "Figtree",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: "500",
  color: globalColor.gray_900,
  textDecoration: "none",
};
export const text_md_semibold = {
  fontFamily: "Figtree",
  fontSize: "16px",
  lineHeight: "24px",
  fontWeight: "500",
  textDecoration: "none",
};
export const text_sm_regular = {
  fontFamily: "Figtree",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: "500",
  textDecoration: "none",
};

// Card Style
export const card_css = {
  main: {
    borderRadius: "16px",
    border: `1px solid ${globalColor.gray_200}`,
    padding: "28px",
    background: globalColor.base_white,
    // width: "calc(50% - 20px)",
    width: "524px",
    minWidth: "524px",
    marginBottom: "25px",
    marginRight: "16px",
  },
  card_title: {
    display: "flex",
    justifyContent: "space-between",
  },
  card_summary: {
    h3: {
      ...text_md_semibold,
      color: globalColor.gray_900,
    },
    p: {
      ...text_sm_regular,
      color: globalColor.gray_500,
      margin: "0px",
    },
    li: {
      ...text_sm_regular,
      color: globalColor.gray_500,
    },
  },
};

export const burg_css = {
  img: {
    cursor: "pointer",
  },
};

// ========== style  =============
export const center_pos = {
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: "auto",
  marginBottom: "auto",
};
export const font_text_sm_Regular = {
  fontFamily: "Figtree",
  fontSize: "14px",
  lineHeight: "20px",
  color: globalColor.gray_600,
  fontWeight: "regular",
  textAlign: "center",
  marginTop: "24px",
};
export const font_text_sm_Regular1 = {
  fontFamily: "Figtree",
  fontSize: "14px",
  lineHeight: "24px",
  color: globalColor.primary_100,
  fontWeight: "regular",
  textAlign: "center",
};
export const font_text_sm_Semibold = {
  fontFamily: "Figtree",
  fontSize: "14px",
  lineHeight: "20px",
  fontWeight: "bold",
  color: globalColor.primary_700,
  textDecoration: "none",
};
export const font_dispaly_xs_regular = {
  fontFamily: "Figtree",
  fontSize: "12px",
  lineHeight: "18px",
  textAlign: "center",
};
export const font_dispaly_xs_Semibold = {
  fontFamily: "Figtree",
  fontSize: "24px",
  lineHeight: "32px",
  textAlign: "center",
  fontWeight: "bold",
  color: globalColor.gray_900,
};
export const font_text_md_Regular = {
  fontFamily: "Figtree",
  fontSize: "16px",
  lineHeight: "24px",
  color: globalColor.gray_600,
  fontWeight: "regular",
  textAlign: "center",
  marginTop: "6px",
};
export const eye_style = {
  position: "absolute",
  right: "13px",
  top: "42px",
  cursor: "pointer",
};
// ========== style end =============
