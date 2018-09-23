

export function genericPrintDate(date) {
    const today = new Date();

    if (typeof date === "string") {
        date = new Date(date);
    }

    const timeDifference = (today.getTime() - date.getTime()) / 1000;

    if (timeDifference < 60 * 60) {
        return "Il y a moins de " + Math.ceil(timeDifference / 60) + " minutes";
    } else if (timeDifference < 60 * 60 * 6) {
        const count = Math.round(timeDifference / (60 * 60));
        return "Il y a " + count + " heure" + (count > 1 ? "s" : "");
    } else {
        const dayDifference = computeDayDifferences(today, date);

        switch (dayDifference) {
            case 0:
                return "Aujourd'hui à " + date.toLocaleTimeString();
            case 1:
                return "Hier à " + date.toLocaleTimeString();
            case 2:
                return "Avant-hier à " + date.toLocaleTimeString();
            default:
                return "Le " + date.toLocaleDateString() + " à " + date.toLocaleTimeString()
        }
    }

}

function computeDayDifferences (date1, date2) {
    date1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDay());
    date2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDay());

    return (date1 - date2) / (1000 * 60 * 60 * 24);
}