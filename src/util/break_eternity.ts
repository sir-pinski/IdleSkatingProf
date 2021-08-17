import Decimal, { DecimalSource } from "@/lib/break_eternity";
import modInfo from "@/data/modInfo.json";

export default Decimal;

const decimalOne = new Decimal(1);

export function exponentialFormat(num: DecimalSource, precision: number, mantissa = true): string {
    let e = Decimal.log10(num).floor();
    let m = Decimal.div(num, Decimal.pow(10, e));
    if (m.toStringWithDecimalPlaces(precision) === "10") {
        m = decimalOne;
        e = e.add(1);
    }
    const eString = e.gte(1e9)
        ? format(e, Math.max(Math.max(precision, 3), modInfo.defaultDecimalsShown))
        : e.gte(10000)
        ? commaFormat(e, 0)
        : e.toStringWithDecimalPlaces(0);
    if (mantissa) {
        return m.toStringWithDecimalPlaces(precision) + "e" + eString;
    } else {
        return "e" + eString;
    }
}

export function commaFormat(num: DecimalSource, precision: number): string {
    if (num === null || num === undefined) {
        return "NaN";
    }
    num = new Decimal(num);
    if (num.mag < 0.001) {
        return (0).toFixed(precision);
    }
    const init = num.toStringWithDecimalPlaces(precision);
    const portions = init.split(".");
    portions[0] = portions[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    if (portions.length == 1) return portions[0];
    return portions[0] + "." + portions[1];
}

export function regularFormat(num: DecimalSource, precision: number): string {
    if (num === null || num === undefined) {
        return "NaN";
    }
    num = new Decimal(num);
    if (num.mag < 0.0001) {
        return (0).toFixed(precision);
    }
    if (num.mag < 0.1 && precision !== 0) {
        precision = Math.max(Math.max(precision, 4), modInfo.defaultDecimalsShown);
    }
    return num.toStringWithDecimalPlaces(precision);
}

export function format(num: DecimalSource, precision?: number, small?: boolean): string {
    if (precision == null) precision = modInfo.defaultDecimalsShown;
    small = small || modInfo.allowSmall;
    num = new Decimal(num);
    if (isNaN(num.sign) || isNaN(num.layer) || isNaN(num.mag)) {
        return "NaN";
    }
    if (num.sign < 0) {
        return "-" + format(num.neg(), precision);
    }
    if (num.mag === Number.POSITIVE_INFINITY) {
        return "Infinity";
    }
    if (num.gte("eeee1000")) {
        const slog = num.slog();
        if (slog.gte(1e6)) {
            return "F" + format(slog.floor());
        } else {
            return (
                Decimal.pow(10, slog.sub(slog.floor())).toStringWithDecimalPlaces(3) +
                "F" +
                commaFormat(slog.floor(), 0)
            );
        }
    } else if (num.gte("1e100000")) {
        return exponentialFormat(num, 0, false);
    } else if (num.gte("1e1000")) {
        return exponentialFormat(num, 0);
    } else if (num.gte(1e9)) {
        return exponentialFormat(num, precision);
    } else if (num.gte(1e3)) {
        return commaFormat(num, 0);
    } else if (num.gte(0.001) || !small) {
        return regularFormat(num, precision);
    } else if (num.eq(0)) {
        return (0).toFixed(precision);
    }

    num = invertOOM(num);
    if (num.lt("1e1000")) {
        const val = exponentialFormat(num, precision);
        return val.replace(/([^(?:e|F)]*)$/, "-$1");
    } else {
        return format(num, precision) + "⁻¹";
    }
}

export function formatWhole(num: DecimalSource): string {
    num = new Decimal(num);
    if (num.sign < 0) {
        return "-" + formatWhole(num.neg());
    }
    if (num.gte(1e9)) {
        return format(num);
    }
    if (num.lte(0.98) && !num.eq(0)) {
        return format(num);
    }
    return format(num, 0);
}

export function formatTime(s: DecimalSource): string {
    if (Decimal.gt(s, 2 ^ 51)) {
        // integer precision limit
        return format(Decimal.div(s, 31536000)) + "y";
    }
    s = new Decimal(s).toNumber();
    if (s < 60) {
        return format(s) + "s";
    } else if (s < 3600) {
        return formatWhole(Math.floor(s / 60)) + "m " + format(s % 60) + "s";
    } else if (s < 86400) {
        return (
            formatWhole(Math.floor(s / 3600)) +
            "h " +
            formatWhole(Math.floor(s / 60) % 60) +
            "m " +
            format(s % 60) +
            "s"
        );
    } else if (s < 31536000) {
        return (
            formatWhole(Math.floor(s / 84600) % 365) +
            "d " +
            formatWhole(Math.floor(s / 3600) % 24) +
            "h " +
            formatWhole(Math.floor(s / 60) % 60) +
            "m " +
            format(s % 60) +
            "s"
        );
    } else {
        return (
            formatWhole(Math.floor(s / 31536000)) +
            "y " +
            formatWhole(Math.floor(s / 84600) % 365) +
            "d " +
            formatWhole(Math.floor(s / 3600) % 24) +
            "h " +
            formatWhole(Math.floor(s / 60) % 60) +
            "m " +
            format(s % 60) +
            "s"
        );
    }
}

export function toPlaces(x: DecimalSource, precision: number, maxAccepted: DecimalSource): string {
    x = new Decimal(x);
    let result = x.toStringWithDecimalPlaces(precision);
    if (new Decimal(result).gte(maxAccepted)) {
        result = Decimal.sub(maxAccepted, Math.pow(0.1, precision)).toStringWithDecimalPlaces(
            precision
        );
    }
    return result;
}

// Will also display very small numbers
export function formatSmall(x: DecimalSource, precision?: number): string {
    return format(x, precision, true);
}

export function invertOOM(x: DecimalSource): Decimal {
    let e = Decimal.log10(x).ceil();
    const m = Decimal.div(x, Decimal.pow(10, e));
    e = e.neg();
    x = new Decimal(10).pow(e).times(m);

    return x;
}
