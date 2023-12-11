export default function InputBox({ cities, setCities, currentDistrict }) {
  const handleStateChange = (selectedState) => {
    setCities(selectedState);
  };

  return (
    <>
      <label>Select District</label>
      <select
        value={currentDistrict}
        onChange={(e) => {
          handleStateChange(e.target.value);
        }}
      >
        <option value={"default"}>Select District</option>
        {cities.map((singleCity) => {
          return (
            <option value={singleCity} key={singleCity}>
              {singleCity}
            </option>
          );
        })}
      </select>
    </>
  );
}
