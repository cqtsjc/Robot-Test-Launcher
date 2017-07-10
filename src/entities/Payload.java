package entities;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Payload {
	    @XmlElement String Protocol;
	    @XmlElement String Testbed;
	    @XmlElement String Path;
	}


