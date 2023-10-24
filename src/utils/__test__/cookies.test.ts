import { eraseCookie, getCookie, setCookie } from "../cookies"; // Điều chỉnh đường dẫn đến tệp của bạn

describe("Cookie Utilities", () => {
  test("setCookie sets a cookie with the given name and value", () => {
    setCookie("testCookie", "testValue");
    const cookieValue = getCookie("testCookie");
    expect(cookieValue).toBe("testValue");
  });

  test("getCookie returns null for a non-existing cookie", () => {
    const cookieValue = getCookie("nonExistentCookie");
    expect(cookieValue).toBeNull();
  });

  test("eraseCookie deletes a cookie", () => {
    setCookie("cookieToDelete", "someValue");
    eraseCookie("cookieToDelete");
    const cookieValue = getCookie("cookieToDelete");
    expect(cookieValue).toBeNull();
  });
});
