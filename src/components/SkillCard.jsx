import { Card, Button, Badge } from 'react-bootstrap';

const SkillCard = ({ skill, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`¿Delete "${skill.skill_name}"?`)) {
      onDelete(skill.id);
    }
  };

  return (
    <Card className="mb-3 hover:shadow-lg transition-shadow duration-200 border-0 shadow-sm" style={{ minWidth: '200px' }}>
      <Card.Body className="p-4">
        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center gap-2 flex-wrap">
                <Card.Title className="h5 mb-0 fw-bold">
                  {skill.skill_name}
                </Card.Title>
                <Badge 
                  bg="primary" 
                  className="text-uppercase px-2 py-1"
                  style={{ fontSize: '0.75rem' }}
                >
                  {skill.level}
                </Badge>
              </div>
            </div>
            <Button 
              variant="danger" 
              size="sm" 
              onClick={handleDelete}
              className="rounded-circle d-flex align-items-center justify-content-center p-0"
              style={{ width: '28px', height: '28px', minWidth: 'auto' }}
            >
              <i className="bi bi-trash" style={{ fontSize: '14px' }}></i>
            </Button>
          </div>
          <Badge 
            bg="primary-subtle" 
            text="primary"
            className="align-self-start px-3 py-2"
            style={{ fontSize: '0.875rem' }}
          >
            <i className="bi bi-book me-2"></i>
            {skill.type === 'teach' ? 'Teaching' : 'Learning'}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SkillCard;