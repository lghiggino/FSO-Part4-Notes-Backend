const average = require("../utils/for_testing").average

test("average of [2, 2]", () => {
    const result = average([2, 2])
    expect(result).toBe(2)
})

test("average of [2, 2, 3]", () => {
    const result = average([2, 2, 3])
    expect(result).toBe(2.3333333333333335)
})

test("average of [1]", () => {
    const result = average([1])
    expect(result).toBe(1)
})