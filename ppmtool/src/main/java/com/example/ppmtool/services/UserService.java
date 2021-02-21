package com.example.ppmtool.services;

import com.example.ppmtool.domain.User;
import com.example.ppmtool.exceptions.UsernameAlreadyExistsException;
import com.example.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser){
        try {
            // encode password
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));

            // Username has to be unique ( exception )
            newUser.setUsername(newUser.getUsername());

            // TODO make sure that password and confirm password match

            // TODO We don't persist or show confirm password
            newUser.setConfirmPassword("");
            return userRepository.save(newUser);

        } catch(Exception e) {
            throw new UsernameAlreadyExistsException("Username '" + newUser.getUsername() + "' already exists.");
        }

    }

}
