import { formatPrice } from "./api.jsx"
import {
    cardStyle,
    tagStyle,
    cardTitleStyle,
    descriptionStyle,
    cardFooterStyle,
    priceStyle,
    unavailableStyle,
    badgeStyle,
} from "./styles.jsx"


export function CourseCard({ course, country, accent }) {
    return (
        <article style={cardStyle}>
            <span style={{ ...tagStyle, color: accent }}>
                {course.mainCategory}
            </span>
            <h3 style={cardTitleStyle}>{course.courseName}</h3>
            <p style={descriptionStyle}>{course.description}</p>
            <div style={cardFooterStyle}>
                {country ? (
                    <span style={priceStyle}>
                        {formatPrice(course, country)}
                    </span>
                ) : (
                    <span style={unavailableStyle}>Price unavailable</span>
                )}
                {course.refundable && (
                    <span style={badgeStyle}>Refundable</span>
                )}
            </div>
        </article>
    )
}
