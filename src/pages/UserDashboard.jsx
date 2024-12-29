import { useEffect, useState } from 'react';
import { getUserSkills, addSkill, deleteSkill } from '../api';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import SkillCard from '../components/SkillCard';

const UserDashboard = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ user_id: localStorage.getItem('idu'), skill_name: '', type: 'teach', level: '' });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await getUserSkills(localStorage.getItem('idu'));
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    try {
      const response = await addSkill(newSkill);
      setSkills([...skills, response.data.skill]);
      setNewSkill({ ...newSkill, skill_name: '', type: 'teach', level: '' });
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await deleteSkill(skillId);
      setSkills(skills.filter((skill) => skill.id !== skillId));
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  return (
    <Container>
      <h1 className="my-4">User Dashboard</h1>
      <Form onSubmit={handleAddSkill} className="mb-4">
        <Row>
          <Col md={4}>
            <Form.Group controlId="skillName">
              <Form.Label>Skill</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="E.g. React"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, skill_name: e.target.value })}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="skillType">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newSkill.type}
                required
                onChange={(e) => setNewSkill({ ...newSkill, type: e.target.value })}
              >
                <option value="teach">To teach</option>
                <option value="learn">To learn</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="skillLevel">
              <Form.Label>Level</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="E.g. Intermediate"
                value={newSkill.level}
                onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="primary" type="submit" className="mt-3">
          Add Skill
        </Button>
      </Form>

      <Row>
        {skills.map((skill) => (
          <Col md={6} lg={4} key={skill.id}>
            <SkillCard skill={skill} onDelete={handleDeleteSkill} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserDashboard;