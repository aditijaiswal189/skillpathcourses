export const font =
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"

export const sectionStyle = {
    width: "100%",
    padding: "64px 24px",
    boxSizing: "border-box",
    background: "#FAFAFA",
    fontFamily: font,
}

export const innerStyle = {
    maxWidth: 1140,
    margin: "0 auto",
}

export const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
}

export const titleStyle = {
    fontSize: 32,
    fontWeight: 700,
    color: "#111",
    margin: 0,
}

export const controlsStyle = {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
}

export const searchStyle = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #DDD",
    fontSize: 14,
    minWidth: 220,
    outline: "none",
    fontFamily: "inherit",
}

export const sortStyle = {
    padding: "10px 14px",
    borderRadius: 10,
    border: "1px solid #DDD",
    fontSize: 14,
    background: "#FFF",
    cursor: "pointer",
    fontFamily: "inherit",
}

export const warningStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
    background: "#FFF8E6",
    border: "1px solid #F5D98B",
    borderRadius: 12,
    padding: "14px 18px",
    fontSize: 14,
    color: "#6B4E00",
    margin: "0 0 24px",
}

export const warningRetryStyle = {
    background: "transparent",
    border: "1px solid #C79A2E",
    color: "#6B4E00",
    borderRadius: 8,
    padding: "8px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
}

export const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: 24,
}

export const cardStyle = {
    background: "#FFF",
    border: "1px solid #EAEAEC",
    borderRadius: 16,
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 12,
}

export const tagStyle = {
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: 999,
    background: "#F1F1F4",
}

export const cardTitleStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: "#111",
    margin: 0,
}

export const descriptionStyle = {
    fontSize: 14,
    lineHeight: 1.5,
    color: "#666",
    margin: 0,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
}

export const cardFooterStyle = {
    marginTop: "auto",
    paddingTop: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}

export const priceStyle = {
    fontSize: 20,
    fontWeight: 700,
    color: "#111",
}

export const unavailableStyle = {
    fontSize: 14,
    fontWeight: 500,
    color: "#8A8A93",
}

export const badgeStyle = {
    fontSize: 12,
    fontWeight: 600,
    color: "#067647",
    background: "#E7F6EC",
    padding: "4px 10px",
    borderRadius: 999,
}

export const messageBoxStyle = {
    background: "#FFF",
    border: "1px solid #EAEAEC",
    borderRadius: 16,
    padding: "48px 24px",
    textAlign: "center",
}

export const messageTitleStyle = {
    fontSize: 18,
    fontWeight: 600,
    color: "#111",
    margin: "0 0 8px",
}

export const messageBodyStyle = {
    fontSize: 14,
    color: "#666",
    margin: "0 0 20px",
}

export const retryStyle = {
    color: "#FFF",
    border: "none",
    padding: "10px 24px",
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
}

export const skeletonBar = {
    height: 12,
    borderRadius: 6,
    background: "#E4E4E9",
    animation: "skillpath-pulse 1.5s ease-in-out infinite",
}
