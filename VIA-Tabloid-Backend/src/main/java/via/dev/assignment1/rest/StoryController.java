package via.dev.assignment1.rest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import via.dev.assignment1.StoryRepository;
import via.dev.assignment1.entity.Story;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/stories")
public class StoryController {

    private final StoryRepository storyRepository;

    public StoryController(StoryRepository storyRepository) {
        this.storyRepository = storyRepository;
    }

    @PostMapping
    public ResponseEntity<Story> addStory(@RequestBody @Valid Story story) {
        try {
            Story savedStory = storyRepository.save(story);
            return new ResponseEntity<>(savedStory, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Story> getStoryById(@PathVariable Long id) {
        Optional<Story> story = storyRepository.findById(id);
        return story.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<Story> getAllStories() {
        return storyRepository.findAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Story> updateStory(@PathVariable("id") Long id, @RequestBody @Valid Story story) {
        Optional<Story> existingStory = storyRepository.findById(id);
        if (existingStory.isPresent()) {
            Story updatedStory = existingStory.get();
            updatedStory.setTitle(story.getTitle());
            updatedStory.setContent(story.getContent());
            updatedStory.setDepartment(story.getDepartment());
            storyRepository.save(updatedStory);
            return new ResponseEntity<>(updatedStory, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStory(@PathVariable("id") Long id) {
        try {
            storyRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}