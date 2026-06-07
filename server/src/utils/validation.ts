export function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

export function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

export function hasLengthBetween<T>(value: T[], min: number, max: number): boolean {
    return value.length >= min && value.length <= max;
}

export function isPositiveInteger(value: unknown): value is number {
    return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function parseRouteId(value: string): number | null {
    const id = Number(value);
    return isPositiveInteger(id) ? id : null;
}
