document.addEventListener("DOMContentLoaded", () => {
    const jobForm = document.getElementById("jobForm");
    if (jobForm) {
        jobForm.addEventListener("submit", async (event) => {
            event.preventDefault(); 
            const formData = new FormData(jobForm);
            const data = {
                title: `${formData.get("firstName")} ${formData.get("lastName")}`, 
                value: 1000,
                custom_fields: {
                    phone: formData.get("phone"),
                    email: formData.get("email"),
                    address: formData.get("address"),
                },
            };
            const apiToken = "10cd2f54cfd870e79916acf317b2edf6555506e2"; 
            const apiUrl = `https://api.pipedrive.com/v1/deals?api_token=${apiToken}`;
            try {
                const response = await fetch(apiUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                console.log("Ответ от Pipedrive:", result);
                if (result.success) {
                    alert("Deal successfully created!");
                    jobForm.reset(); 
                } else {
                    alert("Error creating deal: " + (result.error || "Unknown error"));
                }
            } catch (error) {
                console.error("Ошибка при подключении к Pipedrive:", error);
                alert("Failed to connect to Pipedrive");
            }
        });
    }
});
