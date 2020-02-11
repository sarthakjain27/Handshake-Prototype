# Handshake-Prototype
This represents a working Handshake Prototype Web Application developed in First Lab Assignment of Enterprise Distributed Systems Course (CMPE 273-01) at San Jose State University. The Web Application is a modern 3-tier application built using Javascript and popular frameworks and libraries such as **Nodejs, Reactjs, Express** and the testing of backend servers have been performed using **JMeter and Mocha**. The application is containerized using **Docker** and deployed on Amazon Web Services using its **Elastic Container Service (ECS)**. The application is supported by SQL Database.

There are two personas using the application:

# - Companies

Companies looking to recruit talent can use the platform to signup and post some openings/events in their company and connect with students. Below is the summary of all the features available to the companies in the platform.

  **1. Sign-Up and Profile Page**: Companies can sign up, provide their basic details such as Name, Location, Description, Upload Profile Picture etc and can later update these details using Profile Page. 
  
  **2. Post Job & List Posted Jobs**: Companies can post a new job opening providing details about the role, location, start and end date, salary etc which will be visible to the student on the platform. Companies can list their posted jobs and see profile & preview resume of all the students who have applied for that particular job and can accept/reject the student.
  
  **3. Student Search**: Companies can search for students using either their name or their college name and filter the results based on the required skill set they are looking for in the student and can see profile & preview resume of all those students.
  
  **4. Events Tab**: Companies can post an event and provide description and eligibility of students who can register onto the event. They can see all their created Events and the list of all students and their profile who have registered in those events. 


# - Students

Students looking for job posting and company events can also sign-up and look out for different events and job postings available. Below is the summary of all the features available to the students in the platform.

  **1. Sign-Up and Profile Page**: Each student can update their profile using Profile tab and provide contact details, their career objective, education and work experience details along with their skill set and upload a profile picture for themselves.
  
  **2. Look up Job Postings**: Students can look all the job postings done by the companies. They can check the job description and can also learn about the company from the provided link and can apply for the job by uploading their resume.
  
  **3. Applications**: Students can list down their applied jobs and can see the status of their application such as Pending, Reviewed & Declined.
  
  **4. Events Page**: Students can see all the event posts made by the companies but would only be register into events where they are eligible based on the eligibility requirements put on by the companies. The events would be listed in increasing order of date.
  
  **5. Students**: Students can search and look up for other students based on their student/college name and can review the profile of those students as well. Their is a filter based on student's major to restrict the list of returned students.
