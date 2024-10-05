export function getErrorMessage(errorMsg) {
  if (errorMsg === undefined) {
    return "Something went wrong. Please try you action again.";
  } else {
    if (errorMsg.text !== undefined) {
      if (errorMsg.text.includes("'required' tag"))
        return "A required field is missing data. Please add the the required data before clicking Save.";
      else if (errorMsg.text.includes("'min' tag"))
        return "Answers are required to be four or more characters long.";
    } else if (errorMsg.cta_standard_text !== undefined) {
      if (errorMsg.cta_standard_text.includes("'required' tag"))
        return "Standard call to action field is missing data. Please add the the required data before clicking Save.";
      else if (errorMsg.cta_standard_text.includes("'min' tag"))
        return "Standard call to action is required to be four or more characters long.";
    } else if (errorMsg.fitness_criteria_id !== undefined) {
      return "Fitness Criteria field is missing data. Please add the the required data before clicking Save.";
    } else if (errorMsg.fitness_criteria_id !== undefined) {
      return "Fitness Criteria field is missing data. Please add the the required data before clicking Save.";
    } else if (errorMsg.experience !== undefined) {
      return "Interview experience field is missing data. Please add the the required data before clicking Save.";
    } else if (errorMsg.style !== undefined) {
      return "Style field is missing data. Please add the the required data before clicking Save.";
    } else if (errorMsg.cta_secondary_text !== undefined) {
      if (errorMsg.cta_secondary_text.includes("'required' tag"))
        return "CTA Secondary text field is missing data. Please add the the required data before clicking Save.";
      else if (errorMsg.cta_secondary_text.includes("'min' tag"))
        return "CTA Secondary text field is required to be four or more characters long.";
    } else if (errorMsg.interview_script_incentive_text !== undefined) {
      if (errorMsg.interview_script_incentive_text.includes("'required' tag"))
        return "Interview script incetive text field is missing data. Please add the the required data before clicking Save.";
      else if (errorMsg.interview_script_incentive_text.includes("'min' tag"))
        return "Interview script incetive text field is required to be four or more characters long.";
    } else if (errorMsg.interview_script_completed_text !== undefined) {
      if (errorMsg.interview_script_completed_text.includes("'required' tag"))
        return "Interview script completed text field is missing data. Please add the the required data before clicking Save.";
      else if (errorMsg.interview_script_completed_text.includes("'min' tag"))
        return "Interview script completed text field is required to be four or more characters long.";
    } else if (errorMsg.error !== undefined) {
      return "Fitness Criteria name already exists. Enter a unique name then save.";
    }
  }
}

export function setCookie(name, value, expired) {
  //  expired: min
  let expires = "";
  if (expired) {
    const date = new Date();
    date.setTime(date.getTime() + expired * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

export function convertDate(dateString) {
  // Create a new Date object
  let date = new Date(dateString);

  // Extract the components
  let month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so add 1
  let day = date.getDate().toString().padStart(2, "0");
  let year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year

  // Format the date as MM/DD/YY
  let formattedDate = `${month}/${day}/${year}`;

  return formattedDate;
}
