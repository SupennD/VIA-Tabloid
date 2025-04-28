package via.dev.assignment1;

import org.springframework.data.jpa.repository.JpaRepository;
import via.dev.assignment1.entity.Story;

public interface StoryRepository extends JpaRepository<Story, Long> {
}
