const numberUtils = {};

const toCountingNumber = (number) => {
    if (typeof number !== 'number' || isNaN(number)) {
        throw new Error('The argument must be a number');
    }

    var oneThousand = 1000;
    var oneLac = 100 * oneThousand;
    var oneMillion = 10 * oneLac;
    var oneBillion = 1000 * oneMillion;
    var oneTrillion = 1000 * oneBillion;

    if (number < 10) {
        return number.toString();
    }

    if (number >= 10 && number < 20) {
        return '10+';
    }

    if (number >= 20 && number < 30) {
        return '20+';
    }

    if (number >= 30 && number < 40) {
        return '30+';
    }

    if (number >= 40 && number < 50) {
        return '40+';
    }

    if (number >= 50 && number < 60) {
        return '50+';
    }

    if (number >= 60 && number < 70) {
        return '60+';
    }

    if (number >= 70 && number < 80) {
        return '70+';
    }

    if (number >= 80 && number < 90) {
        return '80+';
    }

    if (number >= 90 && number < 100) {
        return '90+';
    }

    if (number >= 100 && number < 200) {
        return '100+';
    }

    if (number >= 200 && number < 300) {
        return '200+';
    }

    if (number >= 300 && number < 400) {
        return '300+';
    }

    if (number >= 400 && number < 500) {
        return '400+';
    }

    if (number >= 500 && number < 600) {
        return '500+';
    }

    if (number >= 600 && number < 700) {
        return '600+';
    }

    if (number >= 700 && number < 800) {
        return '700+';
    }

    if (number >= 800 && number < 900) {
        return '800+';
    }

    if (number >= 900 && number < oneThousand) {
        return '900+';
    }

    if (number >= oneThousand && number < oneLac) {
        return (number / oneThousand).toFixed(1) + 'K+';
    }

    if (number >= oneLac && number < oneMillion) {
        return (number / oneLac).toFixed(1) + 'L+';
    }

    if (number >= oneMillion && number < oneBillion) {
        return (number / oneMillion).toFixed(1) + 'M+';
    }

    if (number >= oneBillion && number < oneTrillion) {
        return (number / oneBillion).toFixed(1) + 'B+';
    }

    if (number >= oneTrillion) {
        return (number / oneTrillion).toFixed(1) + 'T+';
    }

    return 'Invalid number';
};

numberUtils.toCountingNumber = toCountingNumber;

export default numberUtils;