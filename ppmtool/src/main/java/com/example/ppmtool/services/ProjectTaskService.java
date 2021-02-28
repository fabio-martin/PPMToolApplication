package com.example.ppmtool.services;

import com.example.ppmtool.domain.Backlog;
import com.example.ppmtool.domain.ProjectTask;
import com.example.ppmtool.exceptions.ProjectNotFoundException;
import com.example.ppmtool.repositories.BacklogRepository;
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
    private ProjectService projectService;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask, String username){
        // Project Tasks to be added to a specific project, project != null, Backlog exists
        Backlog backlog = projectService.findProjectByIdentifier(projectIdentifier, username).getBacklog();

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
    }

    public List<ProjectTask> findBackLogById(String id, String username) {
        projectService.findProjectByIdentifier(id, username);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
    }

    public ProjectTask findPTByProjectSequence(String backlog_id, String pt_id, String username){
        // check if project exists
        projectService.findProjectByIdentifier(backlog_id, username);

        // make sure that our task exists
        ProjectTask projectTask = projectTaskRepository.findByProjectSequence(pt_id);
        if(projectTask == null){
            throw new ProjectNotFoundException("Project task '" + pt_id + "' not found.");
        }

        //  make sure that the backlog/project id in the path respondes to the right project
        if(!projectTask.getProjectIdentifier().equals(backlog_id)){
            throw new ProjectNotFoundException("Project task '" + pt_id + "' does not exist in project: '" + backlog_id );
        }

        return projectTask;
    }

    // Update project task
    public ProjectTask updatedProjectSequence( ProjectTask updatedTask, String backlog_id, String pt_id,String username){
        findPTByProjectSequence(backlog_id, pt_id, username);
        // save update
        return projectTaskRepository.save(updatedTask);
    }

    public void deleteProjectTaskByProjectSequence(String backlog_id, String pt_id, String username){
        ProjectTask projectTask = findPTByProjectSequence(backlog_id, pt_id, username);
        projectTaskRepository.delete(projectTask);
    }


}

