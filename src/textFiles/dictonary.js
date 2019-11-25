export function languagesText() {
    return {lang: [{id: "de", name: "Deutsch"}, {id: "en", name: "Englisch"}]}
}

export function categoriesText() {
    return {
        cat: [{id: "business", name: "Wirtschaft"}, {id: "entertainment", name: "Unterhaltung"}, {
            id: "general",
            name: "Allgemein"
        },
            {id: "health", name: "Gesundheit"}, {id: "science", name: "Wissenschaft"}, {id: "sports", name: "Sport"},
            {id: "technology", name: "Technologie"}, {id: undefined, name: "Keine Präferenz"}]
    };
}

export function overLayContentText() {
    return {
        languageOverlay: "In welcher Sprache möchtest du deine News?",
        categoryOverlay: "Welche Themenbereiche interessieren dich?"
    };
}

export function snackbarTextText() {
    return {
        updateNotifier: "Viel Spaß mit den aktuellen Nachrichten",
        updateSources: "Sie können nun ein Nachrichtenportal wählen",
        showHeadlines: "Viel Spaß mit den aktuellen Nachrichten",
    }
}