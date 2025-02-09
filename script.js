async function getNutritionData() {
    const foodItem = document.getElementById("foodInput").value.trim();

    if (!foodItem) {
        alert("Please enter a food item!");
        return;
    }

    const appId = " "  // Replace with your Edamam APP ID
    const appKey = " " // Replace with your Edamam APP Key
    const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(foodItem)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data); // Check API response in Console

        if (data.calories) {
            document.getElementById("result").innerHTML = `
                <h3>Nutrition Facts for ${foodItem}</h3>
                <p><strong>Calories:</strong> ${data.calories}</p>
                <p><strong>Fat:</strong> ${data.totalNutrients.FAT?.quantity.toFixed(2)} ${data.totalNutrients.FAT?.unit || "g"}</p>
                <p><strong>Protein:</strong> ${data.totalNutrients.PROCNT?.quantity.toFixed(2)} ${data.totalNutrients.PROCNT?.unit || "g"}</p>
                <p><strong>Carbs:</strong> ${data.totalNutrients.CHOCDF?.quantity.toFixed(2)} ${data.totalNutrients.CHOCDF?.unit || "g"}</p>
            `;
        } else {
            document.getElementById("result").innerHTML = `<p>No nutrition data found.</p>`;
        }
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        document.getElementById("result").innerHTML = `<p>Error fetching data. Try again later.</p>`;
    }
}
