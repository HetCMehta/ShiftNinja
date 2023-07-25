package EmployeeLoginRegistration;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

import static EmployeeLoginRegistration.DatabaseOps.LoginRegistration.loginEmployee;
import static EmployeeLoginRegistration.DatabaseOps.LoginRegistration.registerEmployee;

@RestController
@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @RequestMapping(value = "/api/employees/registration", method = RequestMethod.POST)
    public String employeeRegistration(@RequestBody String employee_registration) throws IOException {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(employee_registration, JsonObject.class);

        // Access the values in the JSON object
        String name = jsonObject.get("name").getAsString();
        String email_id = jsonObject.get("email_id").getAsString();
        String password = jsonObject.get("password").getAsString();
        String company_code = jsonObject.get("company_code").getAsString();
        String role = jsonObject.get("role").getAsString();

        String status = registerEmployee(name, email_id, password, company_code, role);
        return status;
    }

    @RequestMapping(value = "/api/employees/login", method = RequestMethod.POST)
    public String employeeLogin(@RequestBody String employee_login) throws IOException {
        Gson gson = new Gson();
        JsonObject jsonObject = gson.fromJson(employee_login, JsonObject.class);

        // Access the values in the JSON object
        String email_id = jsonObject.get("email_id").getAsString();
        String password = jsonObject.get("password").getAsString();

        String status = loginEmployee(email_id, password);
        return status;
    }
}