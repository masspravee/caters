export default async function GetRequest(route) {
  var response = await fetch(`/api/${route}`, {
    method: "GET",
    contentType: "application/json",
  });
  var res = await response.json();
  return res;
}
