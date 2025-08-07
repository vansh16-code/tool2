import React, { useEffect } from 'react';

const CalorieInfo = () => {
  // Use useEffect to ensure KaTeX renders after the component mounts
  useEffect(() => {
    // Dynamically load the KaTeX CSS and JS if not already present
    if (!document.querySelector('link[href*="katex.min.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css';
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[src*="katex.min.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js';
      script.onload = () => {
        renderMath();
      };
      document.head.appendChild(script);
    } else {
      // If KaTeX is already loaded, render immediately
      renderMath();
    }

    function renderMath() {
      // Find all math expressions and render them with KaTeX
      document.querySelectorAll('.katex-display').forEach(element => {
        try {
          // The text content should be the raw LaTeX string, so we render it.
          // We get the raw text from a hidden span to prevent re-rendering issues.
          const rawText = element.querySelector('span.raw-latex').textContent;
          katex.render(rawText, element, {
            throwOnError: false,
            displayMode: true,
          });
        } catch (e) {
          console.error("KaTeX rendering failed for:", element.textContent, e);
        }
      });
    }
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Calorie Calculator Information</h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        This Calorie Calculator is based on several equations, and the results are based on an estimated average. The <strong>Harris-Benedict Equation</strong> was one of the earliest equations used to calculate basal metabolic rate (BMR), which is the amount of energy expended per day at rest. It was revised in 1984 to be more accurate and was used up until 1990, when the <strong>Mifflin-St Jeor Equation</strong> was introduced. The Mifflin-St Jeor Equation also calculates BMR and has been shown to be more accurate than the revised Harris-Benedict Equation. The <strong>Katch-McArdle Formula</strong> is slightly different in that it calculates resting daily energy expenditure (RDEE), which takes lean body mass into account, something that neither of the other two equations do. Of these, the Mifflin-St Jeor Equation is considered the most accurate, though the Katch-McArdle Formula can be more accurate for people who are leaner and know their body fat percentage.
      </p>

      <h3 className="text-xl font-bold text-gray-800 mb-2">The Equations Used</h3>
      <div className="mb-6 space-y-4">
        {/* The math equations are wrapped in a div with overflow-x-auto for responsiveness. */}
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <p className="font-semibold text-gray-900">Mifflin-St Jeor Equation:</p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>For men: <span className="katex-display"><span className="raw-latex"> BMR = 10W + 6.25H - 5A + 5 </span></span></li>
            <li>For women: <span className="katex-display"><span className="raw-latex"> BMR = 10W + 6.25H - 5A - 161 </span></span></li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <p className="font-semibold text-gray-900">Revised Harris-Benedict Equation:</p>
          <ul className="list-disc list-inside ml-4 text-gray-700">
            <li>For men: <span className="katex-display"><span className="raw-latex"> BMR = 13.397W + 4.799H - 5.677A + 88.362 </span></span></li>
            <li>For women: <span className="katex-display"><span className="raw-latex"> BMR = 9.247W + 3.098H - 4.330A + 447.593 </span></span></li>
          </ul>
        </div>
        <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
          <p className="font-semibold text-gray-900">Katch-McArdle Formula:</p>
          <p className="ml-4 text-gray-700"><span className="katex-display"><span className="raw-latex"> BMR = 370 + 21.6(1 - F)W </span></span></p>
          <p className="text-sm mt-2 text-gray-600">
            *Where W is body weight in kg, H is body height in cm, A is age, and F is body fat in percentage.*
          </p>
        </div>
      </div>

      <p className="text-gray-600 leading-relaxed mb-6">
        The value from these equations is the estimated number of calories a person can consume in a day to maintain their weight at rest. This value is then multiplied by an <strong>activity factor</strong> (generally 1.2-1.95). <strong>One pound</strong> (or ~0.45 kg) is approximately <strong>3,500 calories</strong>. To lose 1 pound per week, it's recommended to reduce your daily calorie intake by 500 calories. It's important not to lower your intake by more than 1,000 calories a day, as losing more than 2 pounds per week can be unhealthy and may lead to muscle loss and a reduced metabolism.
      </p>

      <h3 className="text-xl font-bold text-gray-800 mb-2">Calorie Counting for Weight Loss</h3>
      <p className="text-gray-600 leading-relaxed mb-4">
        Calorie counting, on its simplest level, involves a few general steps:
      </p>
      <ol className="list-decimal list-inside ml-4 space-y-2 text-gray-700 mb-6">
        <li><strong>Determine your BMR</strong> using one of the provided equations.</li>
        <li><strong>Set your weight loss goals.</strong> Aim to reduce daily intake by about 500 calories to lose 1 pound per week.</li>
        <li><strong>Track your calories</strong> using an app, website, or a simple journal.</li>
        <li><strong>Monitor your progress</strong> over time and adjust as needed.</li>
      </ol>
      <p className="text-gray-600 leading-relaxed mb-6">
        Remember that calorie counting isn't an exact science, and many other factors, such as the type of food you eat and your body's unique metabolism, play a role.
      </p>

      <h3 className="text-xl font-bold text-gray-800 mb-2">Zigzag Calorie Cycling</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        <strong>Zigzag calorie cycling</strong> is a weight loss approach that involves alternating between high-calorie and low-calorie days to meet the same overall weekly calorie target. This method is designed to prevent your body from adapting to a consistent low-calorie diet, which can lead to weight loss plateaus. It also offers more flexibility for social events or "cheat days."
      </p>

      <h3 className="text-xl font-bold text-gray-800 mb-2">How Many Calories Do You Need?</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        The number of calories a person needs is highly individual and depends on factors like age, weight, height, sex, and activity levels. The U.S. Department of Health suggests adult males generally need <strong>2,000-3,000 calories per day</strong>, while adult females need around <strong>1,600-2,400</strong>. Consuming too few calories can be harmful; Harvard Health Publications recommends a minimum of 1,200 calories a day for women and 1,500 for men.
      </p>

      <h3 className="text-xl font-bold text-gray-800 mb-2">The "Quality" of Calories</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        Not all calories are created equal. The main sources of calories are <strong>carbohydrates, proteins, and fat</strong>. Foods that require more chewing and are difficult to digest, such as vegetables and lean meats, cause the body to burn more calories during digestion. <strong>Empty calories</strong>, often found in added sugars and solid fats, provide little to no nutritional value. It's important to focus on a balanced diet of unprocessed foods rather than solely on calorie numbers.
      </p>

      <h3 className="text-xl font-bold text-gray-800 mb-2">Calories in Common Foods</h3>
      <div className="overflow-x-auto mb-6 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Food</th>
              <th scope="col" className="px-6 py-3">Serving Size</th>
              <th scope="col" className="px-6 py-3">Calories</th>
              <th scope="col" className="px-6 py-3">kJ</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="4">
                <span className="font-bold">Fruit</span>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Apple</td><td className="px-6 py-4">1 (4 oz.)</td><td className="px-6 py-4">59</td><td className="px-6 py-4">247</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Banana</td><td className="px-6 py-4">1 (6 oz.)</td><td className="px-6 py-4">151</td><td className="px-6 py-4">632</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Grapes</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">100</td><td className="px-6 py-4">419</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Orange</td><td className="px-6 py-4">1 (4 oz.)</td><td className="px-6 py-4">53</td><td className="px-6 py-4">222</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Pear</td><td className="px-6 py-4">1 (5 oz.)</td><td className="px-6 py-4">82</td><td className="px-6 py-4">343</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Peach</td><td className="px-6 py-4">1 (6 oz.)</td><td className="px-6 py-4">67</td><td className="px-6 py-4">281</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Pineapple</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">82</td><td className="px-6 py-4">343</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Strawberry</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">53</td><td className="px-6 py-4">222</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Watermelon</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">50</td><td className="px-6 py-4">209</td></tr>
            <tr className="bg-gray-100 border-b hover:bg-gray-200">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="4">
                <span className="font-bold">Vegetables</span>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Asparagus</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">27</td><td className="px-6 py-4">113</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Broccoli</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">45</td><td className="px-6 py-4">188</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Carrots</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">50</td><td className="px-6 py-4">209</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Cucumber</td><td className="px-6 py-4">4 oz.</td><td className="px-6 py-4">17</td><td className="px-6 py-4">71</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Eggplant</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">35</td><td className="px-6 py-4">147</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Lettuce</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">5</td><td className="px-6 py-4">21</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Tomato</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">22</td><td className="px-6 py-4">92</td></tr>
            <tr className="bg-gray-100 border-b hover:bg-gray-200">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="4">
                <span className="font-bold">Proteins</span>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Beef, regular, cooked</td><td className="px-6 py-4">2 oz.</td><td className="px-6 py-4">142</td><td className="px-6 py-4">595</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Chicken, cooked</td><td className="px-6 py-4">2 oz.</td><td className="px-6 py-4">136</td><td className="px-6 py-4">569</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Tofu</td><td className="px-6 py-4">4 oz.</td><td className="px-6 py-4">86</td><td className="px-6 py-4">360</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Egg</td><td className="px-6 py-4">1 large</td><td className="px-6 py-4">78</td><td className="px-6 py-4">327</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Fish, Catfish, cooked</td><td className="px-6 py-4">2 oz.</td><td className="px-6 py-4">136</td><td className="px-6 py-4">569</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Pork, cooked</td><td className="px-6 py-4">2 oz.</td><td className="px-6 py-4">137</td><td className="px-6 py-4">574</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Shrimp, cooked</td><td className="px-6 py-4">2 oz.</td><td className="px-6 py-4">56</td><td className="px-6 py-4">234</td></tr>
            <tr className="bg-gray-100 border-b hover:bg-gray-200">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="4">
                <span className="font-bold">Common Meals/Snacks</span>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Bread, white</td><td className="px-6 py-4">1 slice (1 oz.)</td><td className="px-6 py-4">75</td><td className="px-6 py-4">314</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Butter</td><td className="px-6 py-4">1 tablespoon</td><td className="px-6 py-4">102</td><td className="px-6 py-4">427</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Caesar salad</td><td className="px-6 py-4">3 cups</td><td className="px-6 py-4">481</td><td className="px-6 py-4">2014</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Cheeseburger</td><td className="px-6 py-4">1 sandwich</td><td className="px-6 py-4">285</td><td className="px-6 py-4">1193</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Hamburger</td><td className="px-6 py-4">1 sandwich</td><td className="px-6 py-4">250</td><td className="px-6 py-4">1047</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Dark Chocolate</td><td className="px-6 py-4">1 oz.</td><td className="px-6 py-4">155</td><td className="px-6 py-4">649</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Corn</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">132</td><td className="px-6 py-4">553</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Pizza</td><td className="px-6 py-4">1 slice (14")</td><td className="px-6 py-4">285</td><td className="px-6 py-4">1193</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Potato</td><td className="px-6 py-4">6 oz.</td><td className="px-6 py-4">130</td><td className="px-6 py-4">544</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Rice</td><td className="px-6 py-4">1 cup cooked</td><td className="px-6 py-4">206</td><td className="px-6 py-4">862</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Sandwich</td><td className="px-6 py-4">1 (6" Subway Turkey Sandwich)</td><td className="px-6 py-4">200</td><td className="px-6 py-4">837</td></tr>
            <tr className="bg-gray-100 border-b hover:bg-gray-200">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap" colSpan="4">
                <span className="font-bold">Beverages/Dairy</span>
              </td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Beer</td><td className="px-6 py-4">1 can</td><td className="px-6 py-4">154</td><td className="px-6 py-4">645</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Coca-Cola Classic</td><td className="px-6 py-4">1 can</td><td className="px-6 py-4">150</td><td className="px-6 py-4">628</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Diet Coke</td><td className="px-6 py-4">1 can</td><td className="px-6 py-4">0</td><td className="px-6 py-4">0</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Milk (1%)</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">102</td><td className="px-6 py-4">427</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Milk (2%)</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">122</td><td className="px-6 py-4">511</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Milk (Whole)</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">146</td><td className="px-6 py-4">611</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Orange Juice</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">111</td><td className="px-6 py-4">465</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Apple cider</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">117</td><td className="px-6 py-4">490</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Yogurt (low-fat)</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">154</td><td className="px-6 py-4">645</td></tr>
            <tr className="bg-gray-50 hover:bg-gray-100"><td className="px-6 py-4">Yogurt (non-fat)</td><td className="px-6 py-4">1 cup</td><td className="px-6 py-4">110</td><td className="px-6 py-4">461</td></tr>
          </tbody>
        </table>
        <p className="text-xs mt-2 text-gray-600">*1 cup = ~250 milliliters, 1 table spoon = 14.2 gram</p>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">2000, 1500, and 1200 Calorie Sample Meal Plans</h3>
      <div className="overflow-x-auto mb-6 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Meal</th>
              <th scope="col" className="px-6 py-3">1200 Cal Plan</th>
              <th scope="col" className="px-6 py-3">1500 Cal Plan</th>
              <th scope="col" className="px-6 py-3">2000 Cal Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Breakfast</td>
              <td className="px-6 py-4">All-bran cereal (125)<br/>Milk (50)<br/>Banana (90)</td>
              <td className="px-6 py-4">Granola (120)<br/>Greek yogurt (120)<br/>Blueberries (40)</td>
              <td className="px-6 py-4">Buttered toast (150)<br/>Egg (80)<br/>Banana (90)<br/>Almonds (170)</td>
            </tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Snack</td>
              <td className="px-6 py-4">Cucumber (30)<br/>Avocado dip (50)</td>
              <td className="px-6 py-4">Orange (70)<br/>Greek yogurt (120)</td>
              <td className="px-6 py-4">Blueberries (40)</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Total</td>
              <td className="px-6 py-4">345 Calories</td>
              <td className="px-6 py-4">350 Calories</td>
              <td className="px-6 py-4">650 Calories</td>
            </tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Lunch</td>
              <td className="px-6 py-4">Grilled cheese with tomato (300)<br/>Salad (50)</td>
              <td className="px-6 py-4">Chicken and vegetable soup (300)<br/>Bread (100)</td>
              <td className="px-6 py-4">Grilled chicken (225)<br/>Grilled vegetables (125)<br/>Pasta (185)</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Snack</td>
              <td className="px-6 py-4">Walnuts (100)</td>
              <td className="px-6 py-4">Apple (75)<br/>Peanut butter (75)</td>
              <td className="px-6 py-4">Hummus (50)<br/>Baby carrots (35)<br/>Crackers (65)</td>
            </tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Total</td>
              <td className="px-6 py-4">450 Calories</td>
              <td className="px-6 py-4">550 Calories</td>
              <td className="px-6 py-4">685 Calories</td>
            </tr>
            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Dinner</td>
              <td className="px-6 py-4">Grilled Chicken (200)<br/>Brussel sprouts (100)<br/>Quinoa (105)</td>
              <td className="px-6 py-4">Steak (375)<br/>Mashed potatoes (150)<br/>Asparagus (75)</td>
              <td className="px-6 py-4">Grilled salmon (225)<br/>Brown rice (175)<br/>Green beans (100)<br/>Walnuts (165)</td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Total</td>
              <td className="px-6 py-4">405 Calories</td>
              <td className="px-6 py-4">600 Calories</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="text-xl font-bold text-gray-800 mb-2">Calories Burned from Common Exercises</h3>
      <div className="overflow-x-auto mb-6 rounded-lg shadow-md">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Activity (1 hour)</th>
              <th scope="col" className="px-6 py-3">125 lb person</th>
              <th scope="col" className="px-6 py-3">155 lb person</th>
              <th scope="col" className="px-6 py-3">185 lb person</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Golf (using cart)</td><td className="px-6 py-4">198</td><td className="px-6 py-4">246</td><td className="px-6 py-4">294</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Walking (3.5 mph)</td><td className="px-6 py-4">215</td><td className="px-6 py-4">267</td><td className="px-6 py-4">319</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Kayaking</td><td className="px-6 py-4">283</td><td className="px-6 py-4">352</td><td className="px-6 py-4">420</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Softball/Baseball</td><td className="px-6 py-4">289</td><td className="px-6 py-4">359</td><td className="px-6 py-4">428</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Swimming (free-style, moderate)</td><td className="px-6 py-4">397</td><td className="px-6 py-4">492</td><td className="px-6 py-4">587</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Tennis (general)</td><td className="px-6 py-4">397</td><td className="px-6 py-4">492</td><td className="px-6 py-4">587</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Running (9 minute mile)</td><td className="px-6 py-4">624</td><td className="px-6 py-4">773</td><td className="px-6 py-4">923</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Bicycling (12-14 mph, moderate)</td><td className="px-6 py-4">454</td><td className="px-6 py-4">562</td><td className="px-6 py-4">671</td></tr>
            <tr className="bg-white border-b hover:bg-gray-50"><td className="px-6 py-4">Football (general)</td><td className="px-6 py-4">399</td><td className="px-6 py-4">494</td><td className="px-6 py-4">588</td></tr>
            <tr className="bg-gray-50 border-b hover:bg-gray-100"><td className="px-6 py-4">Basketball (general)</td><td className="px-6 py-4">340</td><td className="px-6 py-4">422</td><td className="px-6 py-4">503</td></tr>
            <tr className="bg-white hover:bg-gray-50"><td className="px-6 py-4">Soccer (general)</td><td className="px-6 py-4">397</td><td className="px-6 py-4">492</td><td className="px-6 py-4">587</td></tr>
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default CalorieInfo;
