import { useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

import { fetchWithRetry } from "./api.jsx"
import { CourseCard } from "./CourseCard.jsx"
import { SkeletonGrid } from "./SkeletonGrid.jsx"
import {
    sectionStyle,
    innerStyle,
    headerStyle,
    titleStyle,
    controlsStyle,
    searchStyle,
    sortStyle,
    warningStyle,
    warningRetryStyle,
    gridStyle,
    messageBoxStyle,
    messageTitleStyle,
    messageBodyStyle,
    retryStyle,
} from "./styles.jsx"

const SUPPORTED_COUNTRIES = ["IN", "US"]

/**
 * @framerSupportedLayoutWidth any-prefer-fixed
 * @framerSupportedLayoutHeight auto
 * @framerIntrinsicWidth 1200
 */
export default function SkillpathCourses(props) {
    const { title = "Explore courses", accentColor = "#4338CA", style } = props

    const [status, setStatus] = useState("loading")
    const [courses, setCourses] = useState([])
    const [country, setCountry] = useState(null)
    const [countryRetrying, setCountryRetrying] = useState(false)
    const [query, setQuery] = useState("")
    const [sort, setSort] = useState("default")
    const [retryKey, setRetryKey] = useState(0)

    useEffect(() => {
        let cancelled = false
        setStatus("loading")

        async function load() {
            const [courseResult, countryResult] = await Promise.allSettled([
                fetchWithRetry("/assignment/course-data"),
                fetchWithRetry("/assignment/country-code"),
            ])
            if (cancelled) return

            if (courseResult.status === "rejected") {
                setStatus("error")
                return
            }
            setCourses(courseResult.value)

            const code =
                countryResult.status === "fulfilled"
                    ? countryResult.value?.country_code
                    : undefined
            setCountry(SUPPORTED_COUNTRIES.includes(code) ? code : null)
            setStatus("ready")
        }

        load()
        return () => {
            cancelled = true
        }
    }, [retryKey])

    async function retryCountry() {
        setCountryRetrying(true)
        try {
            const res = await fetchWithRetry("/assignment/country-code")
            const code = res?.country_code
            if (SUPPORTED_COUNTRIES.includes(code)) setCountry(code)
        } catch (err) {
        } finally {
            setCountryRetrying(false)
        }
    }

    const filtered = courses.filter((c) =>
        [c.courseName, c.mainCategory, c.shortCourse]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase())
    )

    const priceOf = (c) => (country === "US" ? c.priceUsdCents : c.pricePaise)

    const visible =
        sort === "default"
            ? filtered
            : [...filtered].sort((a, b) =>
                  sort === "asc"
                      ? priceOf(a) - priceOf(b)
                      : priceOf(b) - priceOf(a)
              )

    return (
        <section style={{ ...sectionStyle, ...style }}>
            <div style={innerStyle}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>{title}</h2>
                    {status === "ready" && courses.length > 0 && (
                        <div style={controlsStyle}>
                            <input
                                type="search"
                                placeholder="Search courses…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                style={searchStyle}
                            />
                            {country && (
                                <select
                                    value={sort}
                                    onChange={(e) => setSort(e.target.value)}
                                    aria-label="Sort courses by price"
                                    style={sortStyle}
                                >
                                    <option value="default">
                                        Sort: featured
                                    </option>
                                    <option value="asc">
                                        Price: low to high
                                    </option>
                                    <option value="desc">
                                        Price: high to low
                                    </option>
                                </select>
                            )}
                        </div>
                    )}
                </div>

                {status === "ready" && courses.length > 0 && !country && (
                    <div style={warningStyle}>
                        <span>
                            We couldn’t detect your region, so prices aren’t
                            shown. Everything else below is unaffected.
                        </span>
                        <button
                            onClick={retryCountry}
                            disabled={countryRetrying}
                            style={warningRetryStyle}
                        >
                            {countryRetrying ? "Retrying…" : "Retry"}
                        </button>
                    </div>
                )}

                {status === "loading" && <SkeletonGrid />}

                {status === "error" && (
                    <div style={messageBoxStyle}>
                        <p style={messageTitleStyle}>Couldn’t load courses</p>
                        <p style={messageBodyStyle}>
                            The server didn’t respond. It usually works on the
                            next try.
                        </p>
                        <button
                            onClick={() => setRetryKey((n) => n + 1)}
                            style={{ ...retryStyle, background: accentColor }}
                        >
                            Try again
                        </button>
                    </div>
                )}

                {status === "ready" && courses.length === 0 && (
                    <div style={messageBoxStyle}>
                        <p style={messageTitleStyle}>No courses yet</p>
                        <p style={messageBodyStyle}>
                            New courses are on the way. Check back soon.
                        </p>
                    </div>
                )}

                {status === "ready" &&
                    courses.length > 0 &&
                    (visible.length === 0 ? (
                        <div style={messageBoxStyle}>
                            <p style={messageTitleStyle}>
                                No matches for “{query}”
                            </p>
                            <p style={messageBodyStyle}>
                                Try a different search.
                            </p>
                        </div>
                    ) : (
                        <div style={gridStyle}>
                            {visible.map((course) => (
                                <CourseCard
                                    key={course.courseCode}
                                    course={course}
                                    country={country}
                                    accent={accentColor}
                                />
                            ))}
                        </div>
                    ))}
            </div>
        </section>
    )
}

addPropertyControls(SkillpathCourses, {
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: "Explore courses",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: "#4338CA",
    },
})
