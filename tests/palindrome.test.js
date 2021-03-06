const palindrome = require("../utils/for_testing").palindrome


test("palindrome of a", () => {
    const result = palindrome("a")
    expect(result).toBe("a")
})

test("palindrome of react", () => {
    const result = palindrome("react")
    expect(result).toBe("tcaer")
})

test("palindrome of racecar", () => {
    const result = palindrome("racecar")
    expect(result).toBe("racecar")
})