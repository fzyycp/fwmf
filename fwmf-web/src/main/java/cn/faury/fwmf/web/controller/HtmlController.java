package cn.faury.fwmf.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/static")
public class HtmlController {

    @GetMapping("login.html")
    public String login() {
        return "/login.html";
    }
}
