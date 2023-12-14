export default async function GetRequest(route) {
  try {
    var response = await fetch(`/api/${route}`, {
      method: "GET",
      contentType: "application/json",
    });
    if (response.ok) {
      var res = await response.json();
      return res;
    } else {
      console.log("Failed to parse response");
      var res = await response.json();
      return res;
    }
  } catch (e) {
    console.log(e + "error");
  }
}
