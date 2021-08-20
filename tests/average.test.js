const average = require("../utils/for_testing").average

describe(average, () => {
    it("average of [2, 2]", () => {
        const result = average([2, 2])
        expect(result).toBe(2)
    })

    it("average of [2, 2, 3]", () => {
        const result = average([2, 2, 3])
        expect(result).toBe(2.3333333333333335)
    })

    it("average of [1]", () => {
        const result = average([1])
        expect(result).toBe(1)
    })

    it("average of empty array: [] is zero 0", () => {
        const result = average([])
        expect(result).toBe(0)
    })
})
