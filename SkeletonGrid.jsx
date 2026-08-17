import { gridStyle, cardStyle, skeletonBar } from "./styles.jsx"

export function SkeletonGrid() {
    return (
        <>
            <style>{`@keyframes skillpath-pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.45 } }`}</style>
            <div style={gridStyle}>
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={cardStyle} aria-hidden>
                        <div style={{ ...skeletonBar, width: "40%" }} />
                        <div
                            style={{
                                ...skeletonBar,
                                width: "80%",
                                height: 20,
                            }}
                        />
                        <div style={{ ...skeletonBar, width: "100%" }} />
                        <div style={{ ...skeletonBar, width: "60%" }} />
                    </div>
                ))}
            </div>
        </>
    )
}
