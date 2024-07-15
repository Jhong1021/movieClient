// Question #1: Create a program that calculate the total order amount. 
// Input should be an array, if not an array, return undefined. 

function calculateTotalAmount(orderAmounts) {

	if(!Array.isArray(orderAmounts)) {                 

		return undefined;
	} 

	let sum = orderAmounts.reduce((acc, currentValue) => {
		return acc + currentValue;
	}, 0);

	return sum;
}

// calculateTotalAmount([1,2,3,4,5,6,7])



// Question #2: Create a program that takes an array of blog post titles and a keyword. 
// The search should be case-insensitive.
// Return undefined if the inputs are not of the expected data types

function filterTitlesByKeyword(titles, keyword) {

	if(!Array.isArray(titles) || typeof keyword !== 'string') {
		return undefined;
	}
	 const toLowerCase = keyword.toLowerCase();
	 const matchTitles = titles.filter(title => 
	 	title.toLowerCase().includes(toLowerCase)
	 );

	 return matchTitles;

}

// filterTitlesByKeyword(["One-Punch Man","Gintama","Grand Blue","Prison School"], "Grand")



// Question #3: Create a program that takes an array of usernames and returns a new array.
// Return undefined if the input is not an array.
// All array elements should be a string.
// Each username's first letter should be capitalized and prefixed by "User:".

function formatUsernames(usernames) {

	if(!Array.isArray(usernames)) {
		return undefined;
	}

	 for (let i = 0; i < usernames.length; i++) {
        if (typeof usernames[i] !== 'string') {
            return undefined;
        }
    }

    const processedUsernames = usernames.map(username => {

        let capitalizedUsername = username.charAt(0).toUpperCase() + username.slice(1);
        return `User: ${capitalizedUsername}`;
    });

    return processedUsernames;
}

//formatUsernames(["dominic", "edna", "jovencio", "clifford"])



// Question #4: Create a program that returns a sorted merged list of unique delivery dates
// Validate both inputs are arrays and contain only integers, if not return undefined

function optimizeDeliverySchedule(datesWarehouse1, datesWarehouse2) {

	if (!Array.isArray(datesWarehouse1) || !datesWarehouse1.every(Number.isInteger) ||
        !Array.isArray(datesWarehouse2) || !datesWarehouse2.every(Number.isInteger)) {
        return undefined;
    }

	let mergedDates = [...datesWarehouse1, ...datesWarehouse2];

	let uniqueDates = Array.from(new Set(mergedDates));

	uniqueDates.sort((a, b) => a - b);

	return uniqueDates;

}

//optimizeDeliverySchedule([19981011, 19800916, 19790701], [19960318, 19981011, 19981011])



// Question #5: Develop a program that removes all scores that are below a certain threshold. 
// Calculate the average of the remaining scores.
// Validate that the array is comprised of integers.
// Return the average score rounded to two decimal places. 
// If after filtering there are no scores left or the input is invalid, return undefined

function removeLowScoresAndCalculateAverage(scores, threshold) {

	function isArrayofIntegers(arr) {
        return Array.isArray(arr) && arr.every(Number.isInteger);
    }

    if (!isArrayofIntegers(scores) || typeof threshold !== 'number') {
        return undefined;
    }

    let filteredScores = scores.filter(score => score >= threshold);

    if (filteredScores.length === 0) {
        return undefined;
    }

    let total = filteredScores.reduce((sum, score) => sum + score, 0);
    let average = total / filteredScores.length;

    return average.toFixed(2);
}

// removeLowScoresAndCalculateAverage([72, 73, 74, 75, 76, 77, 78], 75)



//Do not modify
//For exporting to test.js
//Note: Do not change any variable and function names. All variables and functions to be checked are listed in the exports.
try{
	module.exports = {

		calculateTotalAmount: typeof calculateTotalAmount !== 'undefined' ? calculateTotalAmount : null,
		filterTitlesByKeyword: typeof filterTitlesByKeyword !== 'undefined' ? filterTitlesByKeyword : null,
		formatUsernames: typeof formatUsernames !== 'undefined' ? formatUsernames : null,
		optimizeDeliverySchedule: typeof optimizeDeliverySchedule !== 'undefined' ? optimizeDeliverySchedule : null,
		removeLowScoresAndCalculateAverage: typeof removeLowScoresAndCalculateAverage !== 'undefined' ? removeLowScoresAndCalculateAverage : null,
	}
} catch(err){

}
