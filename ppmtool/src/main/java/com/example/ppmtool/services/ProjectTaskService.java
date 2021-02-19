package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.Project;
import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.exceptions.ProjectIdException;
import com.example.ppmtool.exceptions.ProjectNotFoundException;
import com.example.ppmtool.repositories.BacklogRepository;
import com.example.ppmtool.repositories.ProjectRepository;
import com.example.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    @Autowired
    private ProjectRepository projectRepository;


    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        try {

            // Project Tasks to be added to a specific project, project != null, Backlog exists
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

            // set the Backlog to Project Task
            projectTask.setBacklog(backlog);

            // We want our project sequence to be like this: IDPRO-1 IDPRO-2 ....100 101
            int backlogSequence = backlog.getPTSequence();

            // Update the backlog sequence
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);
            backlogRepository.save(backlog);

            // Add sequence to projectTask
            projectTask.setProjectSequence(projectIdentifier + "-" + backlogSequence);
            projectTask.setProjectIdentifier(projectIdentifier);

            // Initial priority when priority is null
            Integer projectTaskPriority = projectTask.getPriority();
            if( projectTaskPriority == null || projectTaskPriority == 0 ){
                projectTask.setPriority(3);
            }

            // Initial status when status is null
            if(projectTask.getStatus() == "" || projectTask.getStatus() == null ){
                projectTask.setStatus("TO_DO");
            }

            return projectTaskRepository.save(projectTask);

        } catch(Exception ex) {
            throw new ProjectNotFoundException("Project Not Found");
        }

    }

    public List<ProjectTask> findBackLogById(String id) {

        Project project = projectRepository.findByProjectIdentifier(id);

        if(project == null)
            throw new ProjectNotFoundException("Project with id: " + id + " does not have backlog.");

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog, String pt_id){

        // make sure we are searching on the right backlog

        //

        return projectTaskRepository.findByProjectSequence(pt_id);
    }
}
