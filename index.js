const students = [];
        let editIndex = -1;

        function enrollStudent() {
            // Get input values and create a student object
            const firstName = document.getElementById("firstName").value;
            const middleName = document.getElementById("middleName").value;
            const lastName = document.getElementById("lastName").value;
            const age = document.getElementById("age").value;
            const gender = document.getElementById("gender").value;
            const birthday = document.getElementById("birthday").value;
            const course = document.getElementById("course").value;
            const schoolYear = document.getElementById("school-year").value;
        
            if (firstName && middleName && lastName && age && gender && birthday && course && schoolYear) {
                const student = { firstName, middleName, lastName, age, gender, birthday, course, schoolYear };
                students.push(student);
                updateStudentList();
                clearInputs();
            } else {
                alert("Please fill out all fields.");
            }
        }
        
        function updateStudentList() {
            const studentList = document.getElementById("studentList");
            studentList.innerHTML = "";
        
            students.forEach((student, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${student.firstName}</td>
                    <td>${student.middleName}</td>
                    <td>${student.lastName}</td>
                    <td>${student.age}</td>
                    <td>${student.gender}</td>
                    <td>${student.birthday}</td>
                    <td>${student.course}</td>
                    <td>${student.schoolYear}</td>
                    <td>
                        <button onclick="editStudent(${index})">Edit</button>
                        <button onclick="deleteStudent(${index})">Delete</button>
                    </td>
                `;
                studentList.appendChild(row);
            });
        }
        
        function clearInputs() {
            document.getElementById("firstName").value = "";
            document.getElementById("middleName").value = "";
            document.getElementById("lastName").value = "";
            document.getElementById("age").value = "";
            document.getElementById("gender").value = "";
            document.getElementById("birthday").value = "";
            document.getElementById("course").value = "";
            document.getElementById("school-year").value = "";
        }
        
        function editStudent(index) {
            editIndex = index;
            const student = students[index];
            document.getElementById("editFirstName").value = student.firstName;
            document.getElementById("editMiddleName").value = student.middleName;
            document.getElementById("editLastName").value = student.lastName;
            document.getElementById("editAge").value = student.age;
            document.getElementById("editGender").value = student.gender;
            document.getElementById("editBirthday").value = student.birthday;
            document.getElementById("editCourse").value = student.course;
            document.getElementById("editSchool-Year").value = student.schoolYear;
            document.getElementById("editForm").style.display = "block";
        
            // Scroll to the edit area
            document.getElementById("editForm").scrollIntoView({ behavior: "smooth" });
        }
        

        function saveEditedStudent() {
            if (editIndex !== -1) {
                const student = students[editIndex];
                student.firstName = document.getElementById("editFirstName").value;
                student.middleName = document.getElementById("editMiddleName").value;
                student.lastName = document.getElementById("editLastName").value;
                student.age = document.getElementById("editAge").value;
                student.gender = document.getElementById("editGender").value;
                student.birthday = document.getElementById("editBirthday").value;
                student.course = document.getElementById("editCourse").value;
                student.schoolYear = document.getElementById("editSchool-Year").value;
        
                updateStudentList();
                clearEditForm();
            }
        }
        
        function deleteStudent(index) {
            students.splice(index, 1);
            updateStudentList();
        }
        
        function clearEditForm() {
            document.getElementById("editForm").style.display = "none";
            editIndex = -1;
            clearInputs();
        }
        
        function searchEnrollees() {
            const searchBar = document.getElementById("searchBar");
            const searchString = searchBar.value.toLowerCase();
        
            // Filter students based on the search string
            const filteredStudents = students.filter(student => {
                const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`.toLowerCase();
                return fullName.includes(searchString);
            });
        
            updateStudentList(filteredStudents); // Update the student list with filtered results
        }
        

        function cancelEdit() {
            // Hide the edit area
            document.getElementById("editForm").style.display = "none";
        
            // Scroll back to the top of the page
            window.scrollTo({ top: 0, behavior: "smooth" });
        
            // Clear the edit form
            clearEditForm();
        }
        

        function checkAge(input) {
            const age = parseInt(input.value, 10);
            if (isNaN(age) || age < 0 || age > 125) {
                input.setCustomValidity("Age must be a number between 0 and 125.");
            } else {
                input.setCustomValidity("");
            }
        }
        