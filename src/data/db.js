const dbPromised = idb.open('yubal', 1, upgradeDB => {
    const clubObjectStore = upgradeDB.createObjectStore('clubs', { keyPath: 'id' })
    clubObjectStore.createIndex('club_name', 'club_name', { unique: false })
})



const getClubFavorite = () => {
    
    return new Promise((resolve, reject) => {
        dbPromised
            .then(db => {
                const tx = db.transaction('clubs', 'readonly')
                const store = tx.objectStore('clubs')
                return store.getAll()
            })
            .then(club => {
                resolve(club)
            })
    })
}

const saveClubFavorite = club => {
    dbPromised
        .then(db => {
            const tx = db.transaction('clubs', 'readwrite')
            const store = tx.objectStore('clubs')
            store.put(club)
            return tx.complete
        })
        .then(() => M.toast({ html: 'This club is your favorite club!' }))
}

const deleteClubFavorite = club => {
    dbPromised
        .then(db => {
            const tx = db.transaction('clubs', 'readwrite')
            const store = tx.objectStore('clubs')
            store.delete(club)
            return tx.complete
        })
        .then(() => M.toast({ html: 'You have deleted your favorite club' }))

}

export { saveClubFavorite, getClubFavorite, deleteClubFavorite }
