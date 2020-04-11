if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js')
        .then((reg) => {
        console.log("Service worker registerred", reg)
        }).catch((err ) => {
        console.log("sw not registered" ,err )
    })
}