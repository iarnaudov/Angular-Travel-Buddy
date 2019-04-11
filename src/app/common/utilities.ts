export default class Utility {
    public static firebaseSnapshotToArray = (snapshot) => {
        var arrayResult = [];
        if (!snapshot) {
            return
        }
        snapshot.forEach((item) => {
            arrayResult.push({
                id: item.id,
                ...item.data()
            });
        });

        return arrayResult;
    }

    public static dateToEpochTime(dateString: string) {
        var dateParams = dateString.split("/");
        var date = new Date(+dateParams[2], +dateParams[1], +dateParams[0]);
        return date.getTime();
    }
}