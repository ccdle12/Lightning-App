// Helper functions used throughout the project.
module.exports = {
    
    // Convert an Javascript Object to JSON.
    ObjToJSON: (obj) => {
        resultStr = JSON.stringify(obj)
        resultJSON = JSON.parse(resultStr)

        return resultJSON
    }
}