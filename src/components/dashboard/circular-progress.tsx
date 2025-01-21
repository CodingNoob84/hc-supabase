import type React from 'react'

interface CircularProgressProps {
    percentage: number
    size?: number
    strokeWidth?: number
    color?: string
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    size = 60,
    strokeWidth = 4,
    color = 'var(--primary)',
}) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <circle
                    className="text-muted stroke-current"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="stroke-primary"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    stroke={color}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        transform: 'rotate(-90deg)',
                        transformOrigin: '50% 50%',
                    }}
                />
            </svg>
            <span className="absolute text-sm font-bold">
                {percentage.toFixed(1)}
            </span>
        </div>
    )
}
